import { Component, Element, Method, Prop } from '@stencil/core';
import type { PlasmidMap } from '../plasmid-map';
import type { CartesianCoordinate } from '../plasmid.type';
import { SVGUtil } from '../services';

@Component({
  tag: 'plasmid-track',
  styleUrl: 'plasmid-track.scss',
  scoped: true,
})
export class PlasmidTrack {
  @Prop() width = 25;
  @Prop() radius = 100;
  @Prop() trackstyle = 'fill:#ccc;stroke:#999;';

  @Element() hostEl!: HTMLPlasmidTrackElement;

  private svgRoot?: SVGElement;
  private map?: PlasmidMap;

  private trackGroupEl!: SVGGElement;

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

  @Method()
  async draw(plasmidMapInstance?: PlasmidMap, svgRoot?: SVGElement): Promise<void> {
    if (plasmidMapInstance && this.map === undefined) {
      this.map = plasmidMapInstance;
      this.svgRoot = svgRoot;
    }
    const { x, y } = this.center;
    const d = SVGUtil.svg.path.donut(x, y, this.radius, this.width);
    if (!this.trackGroupEl) {
      const g = SVGUtil.svg.createNode<SVGGElement>('g');
      const path = SVGUtil.svg.createNode<SVGGElement>('path');
      path.setAttribute('fill-rule', 'evenodd');
      g.appendChild(path);
      this.trackGroupEl = g;
      this.svgRoot?.append(g);
    }
    this.trackGroupEl.firstElementChild?.setAttribute('d', d);
    this.trackGroupEl.firstElementChild?.setAttribute('style', this.trackstyle);

    // Render track markers
    this.hostEl.querySelectorAll('track-marker').forEach((tm) => {
      tm.draw(this as PlasmidTrack, this.trackGroupEl);
    });

    // Render track scales
    this.hostEl.querySelectorAll('track-scale').forEach((ts) => {
      ts.draw(this as PlasmidTrack, this.trackGroupEl);
    });

    // Render track labels
    this.hostEl.querySelectorAll('track-label').forEach((tl) => {
      tl.draw(this as PlasmidTrack, this.trackGroupEl);
    });
  }

  async componentDidUpdate() {
    this.draw();
  }
}
