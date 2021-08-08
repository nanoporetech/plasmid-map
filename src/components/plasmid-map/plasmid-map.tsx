import { Component, h, Prop, Element } from '@stencil/core';
import { CartesianCoordinate, Dimension } from '../../types/plasmid.type';

@Component({
  tag: 'plasmid-map',
  styleUrl: 'plasmid-map.scss',
  scoped: true,
})
export class PlasmidMap {
  /**
   * nucleotide sequence `"ACGTGCCT..."`
   */
  @Prop() sequence = '';
  /**
   * Plasmid sequence length
   */
  @Prop() sequencelength = 0;
  /**
   * SVG image width
   */
  @Prop() plasmidwidth = 300;
  /**
   * SVG image height
   */
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

  private draw() {
    this.hostEl.querySelectorAll<HTMLPlasmidTrackElement>('plasmid-track:not(.docs-only)').forEach(pt => {
      pt.draw(this, this.svgRoot);
    });
  }

  componentDidLoad() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <svg
        ref={init => (this.svgRoot = init)}
        class="plasmid-map svg-content"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${this.plasmidwidth} ${this.plasmidheight}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <slot />
        <plasmid-track class="docs-only" style={{ display: 'none' }} />
      </svg>
    );
  }
}
