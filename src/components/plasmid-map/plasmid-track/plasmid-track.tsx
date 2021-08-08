import { Component, Element, h, Host, Method, Prop } from '@stencil/core';
import type { PlasmidMap } from '../plasmid-map';
import type { CartesianCoordinate } from '../../../types/plasmid.type';
import { createNode, pathDonut } from '../../../utils';

@Component({
  tag: 'plasmid-track',
  styleUrl: 'plasmid-track.scss',
  shadow: true,
})
export class PlasmidTrack {
  /**
   * track width
   */
  @Prop() width = 25;
  /**
   * track radius
   */
  @Prop() radius = 100;
  /**
   * CSS element style for track
   */
  @Prop() trackstyle = 'fill:#ccc;stroke:#999;';
  /**
   * CSS class for track
   */
  @Prop() trackclass = '';

  @Element() hostEl!: HTMLPlasmidTrackElement;

  private svgRoot?: SVGElement;
  private map?: PlasmidMap;

  private trackGroupEl!: SVGGElement;
  private trackGroupPathEl!: SVGPathElement;

  get plasmid(): PlasmidMap | undefined {
    return this.map;
  }

  get center(): CartesianCoordinate {
    if (this.map === undefined) {
      return {
        x: 0,
        y: 0,
      };
    }
    return this.map.center;
  }

  /**
   * Called by [plasmid-map](..) parent passing in the host instance and element
   */
  @Method()
  async draw(plasmidMapInstance?: PlasmidMap, svgRoot?: SVGElement): Promise<void> {
    if (plasmidMapInstance && this.map === undefined) {
      this.map = plasmidMapInstance;
      this.svgRoot = svgRoot;
    }
    const { x, y } = this.center;
    const d = pathDonut(x, y, this.radius, this.width);
    if (this.trackGroupEl === undefined) {
      this.trackGroupEl = createNode<SVGGElement>('g');
      this.trackGroupPathEl = createNode<SVGPathElement>('path');
      this.trackGroupPathEl.setAttribute('fill-rule', 'evenodd');
      this.trackGroupEl.appendChild(this.trackGroupPathEl);
      this.svgRoot?.append(this.trackGroupEl);
    }
    this.trackGroupPathEl.setAttribute('d', d);
    this.trackGroupPathEl.setAttribute('style', this.trackstyle);
    this.trackGroupPathEl.setAttribute('class', this.trackclass);

    // Render track markers
    this.hostEl.querySelectorAll<HTMLTrackMarkerElement>('track-marker:not(.docs-only)').forEach(tm => {
      tm.draw(this as PlasmidTrack, this.trackGroupEl);
    });

    // Render track scales
    this.hostEl.querySelectorAll<HTMLTrackScaleElement>('track-scale:not(.docs-only)').forEach(ts => {
      ts.draw(this as PlasmidTrack, this.trackGroupEl);
    });

    // Render track labels
    this.hostEl.querySelectorAll<HTMLTrackLabelElement>('track-label:not(.docs-only)').forEach(tl => {
      tl.draw(this as PlasmidTrack, this.trackGroupEl);
    });
  }

  async componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <Host>
        <track-label class="docs-only" style={{ display: 'none' }} />
        <track-marker class="docs-only" style={{ display: 'none' }} />
        <track-scale class="docs-only" style={{ display: 'none' }} />
      </Host>
    );
  }
}
