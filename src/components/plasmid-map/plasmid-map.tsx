import { Component, Host, h, Prop, Method, Element } from '@stencil/core';
import { CartesianCoordinate, Dimension } from './plasmid.type';

// const Hello = (props: any, children: any) => [<h1>Hello, {props.name}</h1>, children];

const DEFAULT_DIMENSION = 300;

@Component({
  tag: 'plasmid-map',
  styleUrl: 'plasmid-map.scss',
})
export class PlasmidMap {
  @Prop() sequence = '';
  @Prop() sequencelength = 0;
  @Prop() plasmidwidth = DEFAULT_DIMENSION;
  @Prop() plasmidheight = DEFAULT_DIMENSION;
  // @Prop() width = DEFAULT_DIMENSION;
  // @Prop() height = DEFAULT_DIMENSION;
  @Prop() data = [];

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

  @Method()
  async getPlasmid(): Promise<PlasmidMap> {
    return this;
  }

  componentDidLoad() {
    this.hostEl.querySelectorAll('plasmid-track').forEach((pt) => {
      pt.draw(this, this.svgRoot);
    });
  }

  render() {
    return (
      <Host part="container">
        <div class="image-container" part="image">
          <svg
            ref={(init) => (this.svgRoot = init)}
            class={`plasmid-map svg-content${this.data && this.data.length ? '' : ' no-data'}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${this.plasmidwidth} ${this.plasmidheight}`}
            preserveAspectRatio="xMinYMin meet"
          >
            <slot />
          </svg>
        </div>
      </Host>
    );
  }
}
