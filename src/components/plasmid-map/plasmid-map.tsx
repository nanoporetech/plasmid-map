import { Component, Host, h, Prop, Element } from '@stencil/core';
import { CartesianCoordinate, Dimension } from '../../types/plasmid.type';

@Component({
  tag: 'plasmid-map',
  styleUrl: 'plasmid-map.scss',
})
export class PlasmidMap {
  @Prop() sequence = '';
  @Prop() sequencelength = 0;
  @Prop() plasmidwidth = 300;
  @Prop() plasmidheight = 300;
  // @Prop() width = 300;
  // @Prop() height = 300;

  @Element() hostEl!: HTMLPlasmidMapElement;

  private svgRoot?: SVGElement;

  get center(): CartesianCoordinate {
    const { width, height } = this.dimensions;
    return {
      x: width / 2,
      y: height / 2,
    };
  }

  get dimensions(): Dimension {
    return {
      height: +this.plasmidheight,
      width: +this.plasmidwidth,
    };
  }

  componentDidLoad() {
    this.hostEl.querySelectorAll('plasmid-track').forEach(pt => {
      pt.draw(this, this.svgRoot);
    });
  }

  render() {
    return (
      <Host>
        <svg
          ref={init => (this.svgRoot = init)}
          class="plasmid-map svg-content"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`0 0 ${this.plasmidwidth} ${this.plasmidheight}`}
          preserveAspectRatio="xMinYMin meet"
        >
          <slot />
        </svg>
      </Host>
    );
  }
}
