import { Component, Host, h, Method, Prop, Element } from '@stencil/core';
import type { PlasmidTrack } from '../plasmid-track';
import type { ArrowPosition, CartesianCoordinate, CartesianCoordinatePositionMap, HAlign, MarkerAngleLimit, MarkerRadiusLimit, VAlign } from '../../../../types/plasmid.type';

import { createNode, pathArc, polarToCartesian } from '../../../../utils';

@Component({
  tag: 'track-marker',
  styleUrl: 'track-marker.scss',
  shadow: true,
})
export class TrackMarker {
  /**
   * start position (given sequence or sequence length)
   */
  @Prop() start = 0;
  /**
   * end position (given sequence or sequence length)
   */
  @Prop() end?: number;
  /**
   * vertical adjustment of marker
   */
  @Prop() vadjust = 0;
  /**
   * marker width adjustment
   */
  @Prop() wadjust = 0;
  /**
   * start arrow length
   */
  @Prop() arrowstartlength = 0;
  /**
   * start arrow width
   */
  @Prop() arrowstartwidth = 0;
  /**
   * start arrow - angle of left and right corner sensible values -3 -> 3
   */
  @Prop() arrowstartangle = 0;
  /**
   * length of arrow
   */
  @Prop() arrowendlength = 0;
  /**
   * width of arrow
   */
  @Prop() arrowendwidth = 0;
  /**
   * end arrow - angle of left and right corner sensible values -3 -> 3
   */
  @Prop() arrowendangle = 0;
  /**
   * CSS marker class
   */
  @Prop() markerclass = '';
  /**
   * CSS element style
   */
  @Prop() markerstyle = '';
  // @Prop() markerclick: () => void = () => {};

  @Element() hostEl!: HTMLTrackMarkerElement;
  private trackMarkerGroupEl!: SVGGElement;
  // private scaleLabelGroupEl!: SVGGElement;

  private trackRootEl?: SVGGElement;
  private track?: PlasmidTrack;

  get center(): CartesianCoordinate {
    if (this.track === undefined) {
      return {
        x: 0,
        y: 0,
      };
    }
    return this.track.center;
  }

  get width(): number {
    if (this.track === undefined) {
      return 0;
    }
    return this.track.width + this.wadjust;
  }

  get angle(): MarkerAngleLimit {
    if (this.track === undefined || this.track.plasmid === undefined) {
      return {
        start: 0,
        middle: 0,
        end: 0,
      };
    }

    const startAngle = (this.start / this.track?.plasmid?.sequencelength) * 360;
    const end = this.end || this.start;
    let endAngle = (end / this.track?.plasmid?.sequencelength) * 360;
    endAngle += endAngle < startAngle ? 360 : 0;

    const midAngle = startAngle + (endAngle - startAngle) / 2;

    return {
      start: startAngle,
      middle: midAngle,
      end: endAngle,
    };
  }

  get arrowstart(): ArrowPosition {
    return {
      width: this.arrowstartwidth,
      length: this.arrowstartlength,
      angle: this.arrowstartangle,
    };
  }

  get arrowend(): ArrowPosition {
    return {
      width: this.arrowendwidth,
      length: this.arrowendlength,
      angle: this.arrowendangle,
    };
  }

  get radius(): MarkerRadiusLimit {
    if (this.track === undefined) {
      return {
        inner: 0,
        outer: 0,
        middle: 0,
      };
    }
    return {
      inner: this.track.radius + this.vadjust,
      middle: this.track.radius + this.vadjust + this.width / 2,
      outer: this.track.radius + this.vadjust + this.width,
    };
  }

  /**
   * Called by [plasmid-track](..) parent passing in the host instance and element
   */
  @Method()
  async draw(plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement): Promise<void> {
    if (plasmidTrackInstance && this.track === undefined) {
      this.track = plasmidTrackInstance;
      this.trackRootEl = trackGroupEl;
    }

    if (this.trackMarkerGroupEl === undefined) {
      const g = createNode<SVGGElement>('g');
      const path = createNode<SVGPathElement>('path');
      g.appendChild(path);
      this.trackMarkerGroupEl = g;
      this.trackRootEl?.append(g);
    }
    const { x, y } = this.center;
    const { inner } = this.radius;
    const { start, end } = this.angle;
    const d = pathArc(x, y, inner, start, end, this.width, this.arrowstart, this.arrowend);

    this.trackMarkerGroupEl.firstElementChild?.setAttribute('d', d);
    this.trackMarkerGroupEl.firstElementChild?.setAttribute('style', `fill:none;${this.markerstyle}`);
    this.trackMarkerGroupEl.firstElementChild?.setAttribute('class', this.markerclass);

    // Render marker labels
    this.hostEl.querySelectorAll<HTMLMarkerLabelElement>('marker-label:not(.docs-only)').forEach(ml => {
      ml.draw(this as TrackMarker, this.trackMarkerGroupEl);
    });
  }

  // eslint-disable-next-line @stencil/own-props-must-be-private
  public getPosition = (hAdjust: number, vAdjust: number, hAlign?: HAlign, vAlign?: VAlign): CartesianCoordinate | CartesianCoordinatePositionMap => {
    const { x, y } = this.center;
    const markerRadius = this.radius;
    const markerAngle = this.angle;

    if (vAlign !== undefined && hAlign !== undefined) {
      let radius = vAdjust;
      let angle = hAdjust;
      switch (vAlign) {
        case 'inner':
          radius += markerRadius.inner;
          break;
        case 'outer':
          radius += markerRadius.outer;
          break;
        default:
          radius += markerRadius.middle;
          break;
      }

      switch (hAlign) {
        case 'start':
          angle += markerAngle.start;
          break;
        case 'end':
          angle += markerAngle.end;
          break;
        default:
          angle += markerAngle.middle;
          break;
      }

      return polarToCartesian(x, y, radius, angle);
    } else {
      const radius = {
        outer: markerRadius.outer + vAdjust,
        inner: markerRadius.inner + vAdjust,
        middle: markerRadius.middle + vAdjust,
      };

      const angle = {
        start: markerAngle.start + hAdjust,
        end: markerAngle.end + hAdjust,
        middle: markerAngle.middle + hAdjust,
      };

      return {
        outer: {
          start: polarToCartesian(x, y, radius.outer, angle.start),
          middle: polarToCartesian(x, y, radius.outer, angle.middle),
          end: polarToCartesian(x, y, radius.outer, angle.end),
        },
        middle: {
          start: polarToCartesian(x, y, radius.middle, angle.start),
          middle: polarToCartesian(x, y, radius.middle, angle.middle),
          end: polarToCartesian(x, y, radius.middle, angle.end),
        },
        inner: {
          start: polarToCartesian(x, y, radius.inner, angle.start),
          middle: polarToCartesian(x, y, radius.inner, angle.middle),
          end: polarToCartesian(x, y, radius.inner, angle.end),
        },
      };
    }
  };

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <Host>
        <marker-label class="docs-only" style={{ display: 'none' }} />
      </Host>
    );
  }
}
