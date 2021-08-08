import { Component, Method, Element, Prop } from '@stencil/core';
import type { TrackMarker } from '../track-marker';
import { createNode, pathArc } from '../../../../../utils';
import type { CartesianCoordinate, CartesianCoordinatePositionMap, HAlign, MarkerLabelAngle, SVGPathArc, VAlign } from '../../../../../types/plasmid.type';

@Component({
  tag: 'marker-label',
  styleUrl: 'marker-label.scss',
  shadow: true,
})
export class MarkerLabel {
  @Prop() text = '';
  @Prop() valign: VAlign = 'middle';
  @Prop() vadjust = 0;
  @Prop() halign: HAlign = 'middle';
  @Prop() hadjust = 0;
  @Prop() type = '';
  @Prop() href = '';
  @Prop() target = '';
  @Prop() showline = false;
  @Prop() linestyle = '';
  @Prop() lineclass = '';
  @Prop() labelstyle = '';
  @Prop() labelclass = '';
  @Prop() linevadjust = 0;
  // @Prop() labelclick: () => void = () => {};

  @Element() hostEl!: HTMLMarkerLabelElement;
  private trackMarkerGroupEl!: SVGGElement;
  private textPathEl!: SVGTextPathElement;
  // private scaleLabelGroupEl!: SVGGElement;

  private markerRootEl?: SVGGElement;
  private marker?: TrackMarker;

  get center(): CartesianCoordinate {
    if (this.marker === undefined) {
      return {
        x: 0,
        y: 0,
      };
    }
    return this.marker.center;
  }

  private getMarkerPosition(hAdjust = 0, vAdjust = 0, hAlign?: HAlign, vAlign?: VAlign): CartesianCoordinate | CartesianCoordinatePositionMap {
    if (this.marker === undefined) {
      return {
        x: 0,
        y: 0,
      } as CartesianCoordinate;
    }
    return this.marker.getPosition(hAdjust, vAdjust, hAlign, vAlign);
  }

  get radius(): number {
    if (this.marker === undefined) {
      return 0;
    }
    const markerRadius = this.marker.radius;
    switch (this.valign) {
      case 'inner':
        return markerRadius.inner;
      case 'outer':
        return markerRadius.outer;
      default:
        return markerRadius.middle;
    }
  }

  get markerAngle(): MarkerLabelAngle {
    if (this.marker === undefined) {
      return {
        startAngle: 0,
        endAngle: 0,
      };
    }
    const markerAngle = this.marker.angle;
    switch (this.halign) {
      case 'start':
        return {
          startAngle: markerAngle.start,
          endAngle: markerAngle.start + 359.99,
        };
      case 'end':
        return {
          startAngle: markerAngle.end + 1,
          endAngle: markerAngle.end,
        };
      default:
        return {
          startAngle: markerAngle.middle + 180.05,
          endAngle: markerAngle.middle + 179.95,
        };
    }
  }

  private emptyElement(el: Element): void {
    while (el.firstElementChild !== null) {
      el.firstElementChild.remove();
    }
  }

  private getMarkerTextAsPath(hAdjust: number, vAdjust: number): SVGPathArc {
    const { x, y } = this.center;

    if (this.marker === undefined) {
      return '';
    }
    const { startAngle, endAngle } = this.markerAngle;

    return pathArc(x, y, this.radius + vAdjust, startAngle + hAdjust, endAngle + hAdjust, 1);
  }

  @Method()
  async draw(trackMarkerInstance?: TrackMarker, trackMarkerGroupEl?: SVGGElement): Promise<void> {
    if (trackMarkerInstance && this.marker === undefined) {
      this.marker = trackMarkerInstance;
      this.markerRootEl = trackMarkerGroupEl;
    }

    if (this.trackMarkerGroupEl === undefined) {
      const g = createNode<SVGGElement>('g');
      const line = createNode<SVGPathElement>('path');
      const path = createNode<SVGPathElement>('path', {
        style: 'fill:none;stroke:none',
        id: `TPATH${(Math.random() + 1).toString(36).substring(3, 7)}`,
      });

      const text = createNode<SVGTextElement>('text', {
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
      });
      g.appendChild(line);
      g.appendChild(path);
      g.appendChild(text);
      g.setAttribute('text', this.text);

      const a = createNode<SVGAElement>('a', {
        href: this.href,
        target: this.target,
      });
      this.href !== '' && a.appendChild(g);

      this.trackMarkerGroupEl = g;
      this.markerRootEl?.append(this.href === '' ? g : a);
    }

    const [lineEl, pathEl, textEl] = Array.from(this.trackMarkerGroupEl.children);

    textEl.setAttribute('class', this.labelclass);
    textEl.setAttribute('style', this.labelstyle);

    if (this.type === 'path') {
      textEl.setAttribute('x', '');
      textEl.setAttribute('y', '');

      if (this.textPathEl === undefined) {
        const textPathSVG = createNode<SVGTextPathElement>('textPath', {
          href: `#${pathEl.id}`,
        });
        this.textPathEl = textPathSVG;
        this.emptyElement(textEl);
        textEl.append(this.textPathEl);
      }

      this.textPathEl.textContent = this.text;
      const fontSize = +window.getComputedStyle(textEl).fontSize.replace('px', '') ?? 0;
      const fontAdjust = this.valign === 'outer' ? 0 : this.valign === 'inner' ? fontSize : fontSize / 2;
      pathEl.setAttribute('d', this.getMarkerTextAsPath(this.hadjust, this.vadjust - fontAdjust));

      switch (this.halign) {
        case 'start':
          textEl.setAttribute('text-anchor', 'start');
          this.textPathEl.setAttribute('startOffset', '0%'); //jQuery can't handle case sensitive names so can't use textPathElem.setAttribute
          break;
        case 'end':
          textEl.setAttribute('text-anchor', 'end');
          this.textPathEl.setAttribute('startOffset', '100%'); //jQuery can't handle case sensitive names so can't use textPathElem.setAttribute
          break;
        default:
          textEl.setAttribute('text-anchor', 'middle');
          this.textPathEl.setAttribute('startOffset', '50%'); //jQuery can't handle case sensitive names so can't use textPathElem.setAttribute
          break;
      }
    } else {
      if (this.textPathEl !== undefined) {
        this.textPathEl.remove();
        this.textPathEl = undefined;
      }
      const { x, y } = this.getMarkerPosition(this.hadjust, this.vadjust, this.halign, this.valign) as CartesianCoordinate;
      textEl.setAttribute('x', `${x ?? 0}`);
      textEl.setAttribute('y', `${y ?? 0}`);
      textEl.textContent = this.text;
    }

    if (this.showline) {
      const { x: sourceX, y: sourceY } = this.getMarkerPosition(this.hadjust, this.vadjust + this.linevadjust, this.halign, this.valign) as CartesianCoordinate;
      const destinationPosition = this.getMarkerPosition() as CartesianCoordinatePositionMap;
      const dstV = destinationPosition[this.valign];
      const { x: destinationX, y: destinationY } = dstV[this.halign];
      lineEl.setAttribute('d', ['M', sourceX, sourceY, 'L', destinationX, destinationY].join(' '));

      if (this.linestyle !== '' && this.lineclass !== '') {
        lineEl.setAttribute('style', 'stroke:#000');
      }
      this.linestyle && lineEl.setAttribute('style', this.linestyle);
      this.lineclass && lineEl.setAttribute('class', this.lineclass);
    } else {
      lineEl.removeAttribute('d');
    }
  }

  componentDidUpdate() {
    this.draw();
  }
}
