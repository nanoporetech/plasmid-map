import { Component, Prop, Element, Method } from '@stencil/core';
import type { PlasmidTrack } from '../plasmid-track';
import { CartesianCoordinate } from '../../../../types/plasmid.type';
import { createNode } from '../../../../utils';

@Component({
  tag: 'track-label',
  styleUrl: 'track-label.scss',
})
export class TrackLabel {
  @Prop() text = '';
  @Prop() hadjust = 0;
  @Prop() vadjust = 0;
  @Prop() labelclass = '';
  @Prop() labelstyle = '';
  // @Prop() labelclick: () => void = () => {};

  @Element() trackLabelEl!: HTMLTrackLabelElement;
  private labelEl!: SVGTextElement;

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

  @Method()
  async draw(plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement): Promise<void> {
    if (plasmidTrackInstance && this.track === undefined) {
      this.track = plasmidTrackInstance;
      this.trackRootEl = trackGroupEl;
    }
    const { x, y } = this.center;
    if (this.labelEl === undefined) {
      const text = createNode<SVGTextElement>('text', {
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
      });
      // text.addEventListener('click', this.labelclick);
      this.labelEl = text;
      this.trackRootEl?.append(text);
    }

    this.labelEl.textContent = this.text;
    this.labelEl.setAttribute('x', `${x + this.hadjust}`);
    this.labelEl.setAttribute('y', `${y + this.vadjust}`);
    this.labelEl.setAttribute('class', this.labelclass);
    this.labelEl.setAttribute('style', this.labelstyle);
  }

  async componentDidUpdate() {
    this.draw();
  }
}
