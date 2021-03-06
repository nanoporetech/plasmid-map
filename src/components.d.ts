/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CartesianCoordinate, CartesianCoordinatePositionMap, HAlign, MarkerLabelType, VAlign } from "./types/plasmid.type";
import { TrackMarker } from "./components/plasmid-map/plasmid-track/track-marker/track-marker";
import { PlasmidMap } from "./components/plasmid-map/plasmid-map";
import { PlasmidTrack } from "./components/plasmid-map/plasmid-track/plasmid-track";
export namespace Components {
    interface MarkerLabel {
        /**
          * Called by [track-marker](..) parent passing in the host instance and element
         */
        "draw": (trackMarkerInstance?: TrackMarker, trackMarkerGroupEl?: SVGGElement) => Promise<void>;
        /**
          * horizontal adjustment of label
         */
        "hadjust": number;
        /**
          * vertical adjustment of label
         */
        "halign": HAlign;
        /**
          * link
         */
        "href": string;
        /**
          * CSS element style of label
         */
        "labelclass": string;
        /**
          * CSS class of label
         */
        "labelstyle": string;
        /**
          * CSS class of label line
         */
        "lineclass": string;
        /**
          * CSS element style of label line
         */
        "linestyle": string;
        /**
          * vertical adjustment of label line
         */
        "linevadjust": number;
        /**
          * show/hide label line
         */
        "showline": boolean;
        /**
          * link target
         */
        "target": string;
        /**
          * label text
         */
        "text": string;
        /**
          * render label as either SVG text or textPath
         */
        "type": MarkerLabelType;
        /**
          * DOC
         */
        "vadjust": number;
        /**
          * vertical alignment of label
         */
        "valign": VAlign;
    }
    interface PlasmidMap {
        /**
          * SVG image height
         */
        "plasmidheight": number;
        /**
          * SVG image width
         */
        "plasmidwidth": number;
        /**
          * SVG image height
         */
        "rotate": number;
        /**
          * nucleotide sequence `"ACGTGCCT..."`
         */
        "sequence": string;
        /**
          * Plasmid sequence length
         */
        "sequencelength": number;
    }
    interface PlasmidTrack {
        /**
          * Called by [plasmid-map](..) parent passing in the host instance and element
         */
        "draw": (plasmidMapInstance?: PlasmidMap, svgRoot?: SVGElement) => Promise<void>;
        /**
          * track radius
         */
        "radius": number;
        /**
          * CSS class for track
         */
        "trackclass": string;
        /**
          * CSS element style for track
         */
        "trackstyle": string;
        /**
          * track width
         */
        "width": number;
    }
    interface TrackLabel {
        /**
          * Called by [plasmid-track](..) parent passing in the host instance and element
         */
        "draw": (plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement) => Promise<void>;
        /**
          * horizontal adjustment
         */
        "hadjust": number;
        /**
          * CSS class for label
         */
        "labelclass": string;
        /**
          * CSS style rules on element
         */
        "labelstyle": string;
        /**
          * label text
         */
        "text": string;
        /**
          * vertical adjustment
         */
        "vadjust": number;
    }
    interface TrackMarker {
        /**
          * end arrow - angle of left and right corner sensible values -3 -> 3
         */
        "arrowendangle": number;
        /**
          * length of arrow
         */
        "arrowendlength": number;
        /**
          * width of arrow
         */
        "arrowendwidth": number;
        /**
          * start arrow - angle of left and right corner sensible values -3 -> 3
         */
        "arrowstartangle": number;
        /**
          * start arrow length
         */
        "arrowstartlength": number;
        /**
          * start arrow width
         */
        "arrowstartwidth": number;
        /**
          * Called by [plasmid-track](..) parent passing in the host instance and element
         */
        "draw": (plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement) => Promise<void>;
        /**
          * end position (given sequence or sequence length)
         */
        "end"?: number;
        /**
          * CSS marker class
         */
        "markerclass": string;
        /**
          * CSS element style
         */
        "markerstyle": string;
        /**
          * start position (given sequence or sequence length)
         */
        "start": number;
        /**
          * vertical adjustment of marker
         */
        "vadjust": number;
        /**
          * marker width adjustment
         */
        "wadjust": number;
    }
    interface TrackScale {
        /**
          * `'in'` is inverse direction
         */
        "direction": '' | 'in';
        /**
          * Called by [plasmid-track](..) parent passing in the host instance and element
         */
        "draw": (plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement) => Promise<void>;
        /**
          * scale interval
         */
        "interval": number;
        /**
          * CSS class of label
         */
        "labelclass": string;
        /**
          * CSS element style of label
         */
        "labelstyle": string;
        /**
          * vertical adjustment of labels
         */
        "labelvadjust": number;
        /**
          * show/hide labels
         */
        "showlabels": boolean;
        /**
          * CSS class of tick
         */
        "tickclass": string;
        /**
          * relative size tick is drawn
         */
        "ticksize": number;
        /**
          * CSS element style of tick
         */
        "tickstyle": string;
        /**
          * vertical adjustment
         */
        "vadjust": number;
    }
}
declare global {
    interface HTMLMarkerLabelElement extends Components.MarkerLabel, HTMLStencilElement {
    }
    var HTMLMarkerLabelElement: {
        prototype: HTMLMarkerLabelElement;
        new (): HTMLMarkerLabelElement;
    };
    interface HTMLPlasmidMapElement extends Components.PlasmidMap, HTMLStencilElement {
    }
    var HTMLPlasmidMapElement: {
        prototype: HTMLPlasmidMapElement;
        new (): HTMLPlasmidMapElement;
    };
    interface HTMLPlasmidTrackElement extends Components.PlasmidTrack, HTMLStencilElement {
    }
    var HTMLPlasmidTrackElement: {
        prototype: HTMLPlasmidTrackElement;
        new (): HTMLPlasmidTrackElement;
    };
    interface HTMLTrackLabelElement extends Components.TrackLabel, HTMLStencilElement {
    }
    var HTMLTrackLabelElement: {
        prototype: HTMLTrackLabelElement;
        new (): HTMLTrackLabelElement;
    };
    interface HTMLTrackMarkerElement extends Components.TrackMarker, HTMLStencilElement {
    }
    var HTMLTrackMarkerElement: {
        prototype: HTMLTrackMarkerElement;
        new (): HTMLTrackMarkerElement;
    };
    interface HTMLTrackScaleElement extends Components.TrackScale, HTMLStencilElement {
    }
    var HTMLTrackScaleElement: {
        prototype: HTMLTrackScaleElement;
        new (): HTMLTrackScaleElement;
    };
    interface HTMLElementTagNameMap {
        "marker-label": HTMLMarkerLabelElement;
        "plasmid-map": HTMLPlasmidMapElement;
        "plasmid-track": HTMLPlasmidTrackElement;
        "track-label": HTMLTrackLabelElement;
        "track-marker": HTMLTrackMarkerElement;
        "track-scale": HTMLTrackScaleElement;
    }
}
declare namespace LocalJSX {
    interface MarkerLabel {
        /**
          * horizontal adjustment of label
         */
        "hadjust"?: number;
        /**
          * vertical adjustment of label
         */
        "halign"?: HAlign;
        /**
          * link
         */
        "href"?: string;
        /**
          * CSS element style of label
         */
        "labelclass"?: string;
        /**
          * CSS class of label
         */
        "labelstyle"?: string;
        /**
          * CSS class of label line
         */
        "lineclass"?: string;
        /**
          * CSS element style of label line
         */
        "linestyle"?: string;
        /**
          * vertical adjustment of label line
         */
        "linevadjust"?: number;
        /**
          * show/hide label line
         */
        "showline"?: boolean;
        /**
          * link target
         */
        "target"?: string;
        /**
          * label text
         */
        "text"?: string;
        /**
          * render label as either SVG text or textPath
         */
        "type"?: MarkerLabelType;
        /**
          * DOC
         */
        "vadjust"?: number;
        /**
          * vertical alignment of label
         */
        "valign"?: VAlign;
    }
    interface PlasmidMap {
        /**
          * SVG image height
         */
        "plasmidheight"?: number;
        /**
          * SVG image width
         */
        "plasmidwidth"?: number;
        /**
          * SVG image height
         */
        "rotate"?: number;
        /**
          * nucleotide sequence `"ACGTGCCT..."`
         */
        "sequence"?: string;
        /**
          * Plasmid sequence length
         */
        "sequencelength"?: number;
    }
    interface PlasmidTrack {
        /**
          * track radius
         */
        "radius"?: number;
        /**
          * CSS class for track
         */
        "trackclass"?: string;
        /**
          * CSS element style for track
         */
        "trackstyle"?: string;
        /**
          * track width
         */
        "width"?: number;
    }
    interface TrackLabel {
        /**
          * horizontal adjustment
         */
        "hadjust"?: number;
        /**
          * CSS class for label
         */
        "labelclass"?: string;
        /**
          * CSS style rules on element
         */
        "labelstyle"?: string;
        /**
          * label text
         */
        "text"?: string;
        /**
          * vertical adjustment
         */
        "vadjust"?: number;
    }
    interface TrackMarker {
        /**
          * end arrow - angle of left and right corner sensible values -3 -> 3
         */
        "arrowendangle"?: number;
        /**
          * length of arrow
         */
        "arrowendlength"?: number;
        /**
          * width of arrow
         */
        "arrowendwidth"?: number;
        /**
          * start arrow - angle of left and right corner sensible values -3 -> 3
         */
        "arrowstartangle"?: number;
        /**
          * start arrow length
         */
        "arrowstartlength"?: number;
        /**
          * start arrow width
         */
        "arrowstartwidth"?: number;
        /**
          * end position (given sequence or sequence length)
         */
        "end"?: number;
        /**
          * CSS marker class
         */
        "markerclass"?: string;
        /**
          * CSS element style
         */
        "markerstyle"?: string;
        /**
          * start position (given sequence or sequence length)
         */
        "start"?: number;
        /**
          * vertical adjustment of marker
         */
        "vadjust"?: number;
        /**
          * marker width adjustment
         */
        "wadjust"?: number;
    }
    interface TrackScale {
        /**
          * `'in'` is inverse direction
         */
        "direction"?: '' | 'in';
        /**
          * scale interval
         */
        "interval"?: number;
        /**
          * CSS class of label
         */
        "labelclass"?: string;
        /**
          * CSS element style of label
         */
        "labelstyle"?: string;
        /**
          * vertical adjustment of labels
         */
        "labelvadjust"?: number;
        /**
          * show/hide labels
         */
        "showlabels"?: boolean;
        /**
          * CSS class of tick
         */
        "tickclass"?: string;
        /**
          * relative size tick is drawn
         */
        "ticksize"?: number;
        /**
          * CSS element style of tick
         */
        "tickstyle"?: string;
        /**
          * vertical adjustment
         */
        "vadjust"?: number;
    }
    interface IntrinsicElements {
        "marker-label": MarkerLabel;
        "plasmid-map": PlasmidMap;
        "plasmid-track": PlasmidTrack;
        "track-label": TrackLabel;
        "track-marker": TrackMarker;
        "track-scale": TrackScale;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "marker-label": LocalJSX.MarkerLabel & JSXBase.HTMLAttributes<HTMLMarkerLabelElement>;
            "plasmid-map": LocalJSX.PlasmidMap & JSXBase.HTMLAttributes<HTMLPlasmidMapElement>;
            "plasmid-track": LocalJSX.PlasmidTrack & JSXBase.HTMLAttributes<HTMLPlasmidTrackElement>;
            "track-label": LocalJSX.TrackLabel & JSXBase.HTMLAttributes<HTMLTrackLabelElement>;
            "track-marker": LocalJSX.TrackMarker & JSXBase.HTMLAttributes<HTMLTrackMarkerElement>;
            "track-scale": LocalJSX.TrackScale & JSXBase.HTMLAttributes<HTMLTrackScaleElement>;
        }
    }
}
