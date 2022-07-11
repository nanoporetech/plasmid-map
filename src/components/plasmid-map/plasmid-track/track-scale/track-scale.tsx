import { Component, Method, Prop, Element } from '@stencil/core';
import type { PlasmidTrack } from '../plasmid-track';
import { CartesianCoordinate } from '../../../../types/plasmid.type';

import { createNode, elementScaleLabels, pathScale } from '../../../../utils';

@Component({
  tag: 'track-scale',
  styleUrl: 'track-scale.scss',
  shadow: true,
})
export class TrackScale {
  /**
   * scale interval
   */
  @Prop() interval = 0;
  /**
   * vertical adjustment
   */
  @Prop() vadjust = 0;
  /**
   * relative size tick is drawn
   */
  @Prop() ticksize = 3;
  /**
   * `'in'` is inverse direction
   */
  @Prop() direction: '' | 'in' = '';
  /**
   * show/hide labels
   */
  @Prop() showlabels = false;
  /**
   * vertical adjustment of labels
   */
  @Prop() labelvadjust = 15;
  /**
   * CSS class of label
   */
  @Prop() labelclass = '';
  /**
   * CSS element style of label
   */
  @Prop() labelstyle = '';
  /**
   * CSS class of tick
   */
  @Prop() tickclass = '';
  /**
   * CSS element style of tick
   */
  @Prop() tickstyle = 'stroke:#999';
  // @Prop() scaleclick: () => void = () => {};

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
    return (this.inwardflg ? this.track.radius : this.track.radius + this.track.width) + (this.inwardflg ? -1 : 1) * this.vadjust + (this.inwardflg ? -this.ticksize : 0);
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

    if (this.scaleGroupEl === undefined) {
      const g = createNode<SVGGElement>('g');
      const path = createNode<SVGPathElement>('path');
      g.appendChild(path);
      this.scaleGroupEl = g;
      this.trackRootEl?.append(g);
    }

    const { x, y } = this.center;
    const d = pathScale(x, y, this.radius, this.interval, this.total, this.ticksize);
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
    const isDefined = this.scaleLabelGroupEl !== undefined;
    while (isDefined && this.scaleLabelGroupEl.firstElementChild !== null) {
      this.scaleLabelGroupEl?.firstElementChild?.remove();
    }
  }

  private drawLabel() {
    if (this.scaleLabelGroupEl === undefined) {
      const g = createNode<SVGGElement>('g');
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
    const labels = elementScaleLabels(x, y, this.labelradius, this.interval, this.total);
    this.clearLabels();

    for (let i = 0; i <= labels.length - 1; i += 1) {
      const t = createNode<SVGTextElement>('text');
      if (this.labelclass !== '') {
        t.setAttribute('class', this.labelclass);
      }
      if (this.labelstyle !== '') {
        t.setAttribute('style', this.labelstyle);
      }
      t.setAttribute('x', `${labels[i].x}`);
      t.setAttribute('y', `${labels[i].y}`);
      t.setAttribute('text-anchor', 'middle');
      t.setAttribute('alignment-baseline', 'middle');
      t.textContent = `${labels[i].text}`;
      t.style.transform = `rotate(${this.track.plasmid.rotate * -1}deg)`;
      t.style.transformOrigin = `${labels[i].x}px ${labels[i].y}px`;
      // t.on('click', clickHandler);
      this.scaleLabelGroupEl.append(t);
    }
  }

  componentDidUpdate() {
    this.draw();
  }
}
