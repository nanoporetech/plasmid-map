export interface CartesianCoordinate {
  x: number;
  y: number;
}

export interface Dimension {
  width: number;
  height: number;
}

export interface SVGDonutPathLimit {
  start: CartesianCoordinate;
  end: CartesianCoordinate;
}

export interface ScaleLabel extends CartesianCoordinate {
  text: number;
}

export type SVGPathScale = string;
export type SVGPathArc = string;
export type SVGDonutPath = string;

export interface ArrowPosition {
  width: number;
  length: number;
  angle: number;
}

export interface MarkerRadiusLimit {
  inner: number;
  middle: number;
  outer: number;
}

export interface MarkerAngleLimit {
  start: number;
  middle: number;
  end: number;
}

export interface MarkerLabelAngle {
  startAngle: number;
  endAngle: number;
}

export interface CartesianCoordinatePositionMap {
  outer: {
    start: CartesianCoordinate;
    middle: CartesianCoordinate;
    end: CartesianCoordinate;
  };
  middle: {
    start: CartesianCoordinate;
    middle: CartesianCoordinate;
    end: CartesianCoordinate;
  };
  inner: {
    start: CartesianCoordinate;
    middle: CartesianCoordinate;
    end: CartesianCoordinate;
  };
}

export type VAlign = 'inner' | 'outer' | 'middle';

export type HAlign = 'start' | 'middle' | 'end';

export type MarkerLabelType = 'text' | 'path';
