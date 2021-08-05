import { Component, Method, Prop, Element } from '@stencil/core';
import type { PlasmidTrack } from '../plasmid-track';
import { CartesianCoordinate } from '../../plasmid.type';

import { SVGUtil } from '../../services';

const DEFAULT_LABELVADJUST = 15;
const DEFAULT_TICKSIZE = 3;

@Component({
  tag: 'track-scale',
  styleUrl: 'track-scale.scss',
})
export class TrackScale {
  @Prop() interval = 0;
  @Prop() vadjust = 0;
  @Prop() ticksize = DEFAULT_TICKSIZE;
  @Prop() direction: '' | 'in' = '';
  @Prop() showlabels = false;
  @Prop() labelvadjust = DEFAULT_LABELVADJUST;
  @Prop() labelclass = '';
  @Prop() labelstyle = '';
  @Prop() tickclass = '';
  @Prop() tickstyle = 'stroke:#999';
  @Prop() scaleclick: () => void = () => {};

  @Element() trackScaleEl!: HTMLTrackScaleElement;
  // private scaleEl!: SVGGElement;
  private scaleGroupEl!: SVGGElement;
  private scaleLabelGroupEl!: SVGGElement;

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

  get inwardflg(): boolean {
    return this.direction === 'in';
  }

  get total(): number {
    if (this.track === undefined) {
      return 0;
    }
    return this.track?.plasmid?.sequencelength ?? 0;
  }

  get labelradius(): number {
    return this.radius + this.labelvadjust * (this.inwardflg ? -1 : 1);
  }

  get radius(): number {
    if (this.track === undefined) {
      return 0;
    }
    return (
      (this.inwardflg ? this.track.radius : this.track.radius + this.track.width) +
      (this.inwardflg ? -1 : 1) * this.vadjust +
      (this.inwardflg ? -this.ticksize : 0)
    );
  }

  @Method()
  async draw(plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement): Promise<void> {
    if (plasmidTrackInstance && this.track === undefined) {
      this.track = plasmidTrackInstance;
      this.trackRootEl = trackGroupEl;
    }

    if (!this.scaleGroupEl) {
      const g = SVGUtil.svg.createNode<SVGGElement>('g');
      const path = SVGUtil.svg.createNode<SVGGElement>('path');
      g.appendChild(path);
      this.scaleGroupEl = g;
      this.trackRootEl?.append(g);
    }

    const { x, y } = this.center;
    const d = SVGUtil.svg.path.scale(x, y, this.radius, this.interval, this.total, this.ticksize);
    this.scaleGroupEl.firstElementChild?.setAttribute('d', d);
    this.scaleGroupEl.firstElementChild?.setAttribute('style', this.tickstyle);
    this.scaleGroupEl.firstElementChild?.setAttribute('class', this.tickclass);

    if (this.showlabels) {
      this.drawLabel();
    } else {
      this.clearLabels();
    }
  }

  private clearLabels() {
    while (this.scaleLabelGroupEl?.firstElementChild) {
      this.scaleLabelGroupEl?.firstElementChild?.remove();
    }
  }

  private drawLabel() {
    if (!this.scaleLabelGroupEl) {
      const g = SVGUtil.svg.createNode<SVGGElement>('g');
      this.scaleLabelGroupEl = g;
      this.scaleGroupEl?.append(g);
    }

    // function clickHandler(e) {
    //   $scope.scaleclick({
    //     $event: e,
    //     $scale: trackScale,
    //   });
    // }
    const { x, y } = this.center;
    const labels = SVGUtil.svg.element.scalelabels(x, y, this.labelradius, this.interval, this.total);
    this.clearLabels();

    for (let i = 0; i <= labels.length - 1; i += 1) {
      const t = SVGUtil.svg.createNode<SVGTextElement>('text');
      if (this.labelclass) {
        t.setAttribute('class', this.labelclass);
      }
      if (this.labelstyle) {
        t.setAttribute('style', this.labelstyle);
      }
      t.setAttribute('x', `${labels[i].x}`);
      t.setAttribute('y', `${labels[i].y}`);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('alignment-baseline', 'middle');
      t.textContent = `${labels[i].text}`;
      // t.on('click', clickHandler);
      this.scaleLabelGroupEl.append(t);
    }
  }

  componentDidUpdate() {
    this.draw();
  }
}
