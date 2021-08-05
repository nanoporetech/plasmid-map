/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CartesianCoordinate, CartesianCoordinatePositionMap, HAlign, VAlign } from "./components/plasmid-map/plasmid.type";
import { TrackMarker } from "./components/plasmid-map/plasmid-track/track-marker/track-marker";
import { PlasmidMap } from "./components/plasmid-map/plasmid-map";
import { PlasmidTrack } from "./components/plasmid-map/plasmid-track/plasmid-track";
export namespace Components {
    interface MarkerLabel {
        "draw": (trackMarkerInstance?: TrackMarker, trackMarkerGroupEl?: SVGGElement) => Promise<void>;
        "hadjust": number;
        "halign": HAlign;
        "labelclass": string;
        "labelstyle": string;
        "lineclass": string;
        "linestyle": string;
        "linevadjust": number;
        "showline": boolean;
        "text": string;
        "type": string;
        "vadjust": number;
        "valign": VAlign;
    }
    interface PlasmidMap {
        "plasmidheight": number;
        "plasmidwidth": number;
        "sequence": string;
        "sequencelength": number;
    }
    interface PlasmidTrack {
        "draw": (plasmidMapInstance?: PlasmidMap, svgRoot?: SVGElement) => Promise<void>;
        "radius": number;
        "trackstyle": string;
        "width": number;
    }
    interface TrackLabel {
        "draw": (plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement) => Promise<void>;
        "hadjust": number;
        "labelclass": string;
        "labelstyle": string;
        "text": string;
        "vadjust": number;
    }
    interface TrackMarker {
        "arrowendangle": number;
        "arrowendlength": number;
        "arrowendwidth": number;
        "arrowstartangle": number;
        "arrowstartlength": number;
        "arrowstartwidth": number;
        "draw": (plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement) => Promise<void>;
        "end"?: number;
        "markerclass": string;
        "markergroup": string;
        "markerstyle": string;
        "start": number;
        "vadjust": number;
        "wadjust": number;
    }
    interface TrackScale {
        "direction": '' | 'in';
        "draw": (plasmidTrackInstance?: PlasmidTrack, trackGroupEl?: SVGGElement) => Promise<void>;
        "interval": number;
        "labelclass": string;
        "labelstyle": string;
        "labelvadjust": number;
        "showlabels": boolean;
        "tickclass": string;
        "ticksize": number;
        "tickstyle": string;
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
        "hadjust"?: number;
        "halign"?: HAlign;
        "labelclass"?: string;
        "labelstyle"?: string;
        "lineclass"?: string;
        "linestyle"?: string;
        "linevadjust"?: number;
        "showline"?: boolean;
        "text"?: string;
        "type"?: string;
        "vadjust"?: number;
        "valign"?: VAlign;
    }
    interface PlasmidMap {
        "plasmidheight"?: number;
        "plasmidwidth"?: number;
        "sequence"?: string;
        "sequencelength"?: number;
    }
    interface PlasmidTrack {
        "radius"?: number;
        "trackstyle"?: string;
        "width"?: number;
    }
    interface TrackLabel {
        "hadjust"?: number;
        "labelclass"?: string;
        "labelstyle"?: string;
        "text"?: string;
        "vadjust"?: number;
    }
    interface TrackMarker {
        "arrowendangle"?: number;
        "arrowendlength"?: number;
        "arrowendwidth"?: number;
        "arrowstartangle"?: number;
        "arrowstartlength"?: number;
        "arrowstartwidth"?: number;
        "end"?: number;
        "markerclass"?: string;
        "markergroup"?: string;
        "markerstyle"?: string;
        "start"?: number;
        "vadjust"?: number;
        "wadjust"?: number;
    }
    interface TrackScale {
        "direction"?: '' | 'in';
        "interval"?: number;
        "labelclass"?: string;
        "labelstyle"?: string;
        "labelvadjust"?: number;
        "showlabels"?: boolean;
        "tickclass"?: string;
        "ticksize"?: number;
        "tickstyle"?: string;
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
