import {
  ArrowPosition,
  CartesianCoordinate,
  ScaleLabel,
  SVGDonutPath,
  SVGDonutPathLimit,
  SVGPathArc,
  SVGPathScale,
} from './plasmid.type';
/*
                PUBLIC API
                -----------------------------------------------------------------------
                api - API for working with AngularPlasmid objects on a page
                util - General utilities
                svg - SVG node, path calculations
            */

const plasmids: any[] = [];
const tracks: any[] = [];
const markers: any[] = [];

// Decimal round with precision
function round10(value: number | (string | number)[], exp: number): number {
  // If the exp is undefined or zero...
  if (typeof exp === 'undefined' || +exp === 0) {
    return Math.round(+value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
    return NaN;
  }
  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
}

function addPlasmid(plasmid: unknown): void {
  plasmids.push(plasmid);
}

function plasmid(id: string): unknown {
  let i: number;
  for (i = 0; i < plasmids.length; i += 1) {
    if (plasmids[i].id === id) {
      return plasmids[i];
    }
  }
  return;
}

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number,
): CartesianCoordinate {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function swapProperties(elemFrom: Element, elemTo: Element): void {
  let property: string;
  const PROPLIST = ['id', 'name', 'class', 'style', 'filter', 'ng-attr-style', 'ng-attr-class', 'ng-class'];

  for (let i = 0; i < PROPLIST.length; i += 1) {
    property = PROPLIST[i];
    if (elemFrom[0].hasAttribute(property)) {
      elemTo.setAttribute(property, elemFrom.getAttribute(property) ?? '');
      elemFrom.removeAttribute(property);
    }
  }
}

function createNode<T = SVGElement>(
  name: string,
  settings: { [x: string]: any } = {},
  excludeSettings: string | any[] = [],
): T {
  const namespace = 'http://www.w3.org/2000/svg';
  const node = document.createElementNS(namespace, name);

  excludeSettings = excludeSettings || [];
  Object.entries(settings).forEach(([attribute, value]) => {
    if (excludeSettings.indexOf(attribute) < 0) {
      value = settings[attribute];
      if (value !== null && !attribute.match(/\$/) && (typeof value !== 'string' || value !== '')) {
        node.setAttribute(attribute, value);
      }
    }
  });
  return (node as unknown) as T;
}

function removeAttributes(element: HTMLElement): void {
  ['id', 'class', 'style'].forEach((a: string) => {
    element.removeAttribute(a);
  });
}

function pathDonut(x: number, y: number, radius: number, width: number): SVGDonutPath {
  x = Number(x || 0);
  y = Number(y || 0);
  radius = Number(radius || 0);
  width = Number(width || 0);

  const innerRing: SVGDonutPathLimit = {
    start: polarToCartesian(x, y, radius, 359.99),
    end: polarToCartesian(x, y, radius, 0),
  };
  const outerRing: SVGDonutPathLimit = {
    start: polarToCartesian(x, y, radius + width, 359.99),
    end: polarToCartesian(x, y, radius + width, 0),
  };
  const path: SVGDonutPath = [
    'M',
    innerRing.start.x,
    innerRing.start.y,
    'A',
    radius,
    radius,
    0,
    1,
    0,
    innerRing.end.x,
    innerRing.end.y,
    'M',
    outerRing.start.x,
    outerRing.start.y,
    'A',
    radius + width,
    radius + width,
    0,
    1,
    0,
    outerRing.end.x,
    outerRing.end.y,
  ].join(' ');

  return path;
}

function pathArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  width: number,
  arrowStart?: ArrowPosition,
  arrowEnd?: ArrowPosition,
): SVGPathArc {
  let d: SVGPathArc,
    arcSweep: '0' | '1',
    start: CartesianCoordinate,
    start2: CartesianCoordinate,
    end: CartesianCoordinate,
    arrow_start_1: CartesianCoordinate,
    arrow_start_2: CartesianCoordinate,
    arrow_start_3: CartesianCoordinate,
    arrow_start_4: CartesianCoordinate,
    arrow_end_1: CartesianCoordinate,
    arrow_end_2: CartesianCoordinate,
    arrow_end_3: CartesianCoordinate,
    arrow_end_4: CartesianCoordinate;

  arrowStart = arrowStart || { width: 0, length: 0, angle: 0 };
  arrowEnd = arrowEnd || { width: 0, length: 0, angle: 0 };

  if (startAngle === endAngle) {
    // Draw a line
    start = polarToCartesian(x, y, radius, startAngle);
    end = polarToCartesian(x, y, radius + width, startAngle);
    d = ['M', start.x, start.y, 'L', end.x, end.y].join(' ');
  } else {
    //Draw a "simple" arc if the width is 1
    if (width === 1) {
      start = polarToCartesian(x, y, radius, startAngle);
      end = polarToCartesian(x, y, radius, endAngle);
      if (startAngle < endAngle) {
        arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
      } else {
        arcSweep = endAngle - startAngle <= 180 ? '1' : '0';
      }
      d = ['M', start.x, start.y, 'A', radius, radius, 0, arcSweep, 1, end.x, end.y].join(' ');
    } else {
      // Draw a "complex" arc (We start drawing in reverse, which is why start uses endAngle)
      endAngle = endAngle - (arrowEnd.length < 0 ? 0 : arrowEnd.length);
      startAngle = startAngle + (arrowStart.length < 0 ? 0 : arrowStart.length);
      start = polarToCartesian(x, y, radius, endAngle);
      end = polarToCartesian(x, y, radius, startAngle);
      arrow_start_1 = polarToCartesian(x, y, radius - arrowStart.width, startAngle + arrowStart.angle);
      arrow_start_2 = polarToCartesian(x, y, radius + width / 2, startAngle - arrowStart.length);
      arrow_start_3 = polarToCartesian(x, y, radius + width + arrowStart.width, startAngle + arrowStart.angle);
      arrow_start_4 = polarToCartesian(x, y, radius + width, startAngle);
      arrow_end_1 = polarToCartesian(x, y, radius + width + arrowEnd.width, endAngle - arrowEnd.angle);
      arrow_end_2 = polarToCartesian(x, y, radius + width / 2, endAngle + arrowEnd.length);
      arrow_end_3 = polarToCartesian(x, y, radius - arrowEnd.width, endAngle - arrowEnd.angle);
      arrow_end_4 = polarToCartesian(x, y, radius, endAngle);
      start2 = polarToCartesian(x, y, radius + width, endAngle);
      arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
      d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        arcSweep,
        0,
        end.x,
        end.y,
        'L',
        arrow_start_1.x,
        arrow_start_1.y,
        'L',
        arrow_start_2.x,
        arrow_start_2.y,
        'L',
        arrow_start_3.x,
        arrow_start_3.y,
        'L',
        arrow_start_4.x,
        arrow_start_4.y,
        'A',
        radius + width,
        radius + width,
        0,
        arcSweep,
        1,
        start2.x,
        start2.y,
        'L',
        arrow_end_1.x,
        arrow_end_1.y,
        'L',
        arrow_end_2.x,
        arrow_end_2.y,
        'L',
        arrow_end_3.x,
        arrow_end_3.y,
        'L',
        arrow_end_4.x,
        arrow_end_4.y,
        'z',
      ].join(' ');
    }
  }

  return d;
}

function pathScale(x = 0, y = 0, radius = 0, interval = 0, total = 0, tickLength = 2): SVGPathScale {
  let alpha: number,
    sin: number,
    cos: number,
    i: number,
    d = '';
  const numTicks = interval > 0 ? total / interval : 0,
    beta = (2 * Math.PI) / numTicks,
    precision = -1;

  for (i = 0; i < numTicks; i += 1) {
    alpha = beta * i - Math.PI / 2;
    cos = Math.cos(alpha);
    sin = Math.sin(alpha);
    d += `M${round10(x + radius * cos, precision)},${round10(y + radius * sin, precision)} L${round10(
      x + (radius + tickLength) * cos,
      precision,
    )},${round10(y + (radius + tickLength) * sin, precision)} `;
  }
  d = d || 'M 0,0';
  return d;
}

function elementScaleLabels(x: number, y: number, radius: number, interval: number, total: number): ScaleLabel[] {
  let alpha: number, sin: number, cos: number, i: number;
  const numTicks = interval > 0 ? total / interval : 0,
    beta = (2 * Math.PI) / numTicks,
    precision = -1,
    labelArr = [];

  for (i = 0; i < numTicks; i += 1) {
    alpha = beta * i - Math.PI / 2;
    cos = Math.cos(alpha);
    sin = Math.sin(alpha);
    labelArr.push({
      x: round10(x + radius * cos, precision),
      y: round10(y + radius * sin, precision),
      text: interval * i,
    });
  }
  return labelArr;
}

function Numeric(numberVal: number, numberDefault = 0): number {
  return isNaN(numberVal) ? numberDefault : Number(numberVal);
}

export const SVGUtil = {
  api: {
    addPlasmid: addPlasmid,
    plasmids: plasmids,
    plasmid: plasmid,
    plasmidtracks: tracks,
    trackmarkers: markers,
  },
  util: {
    polarToCartesian: polarToCartesian,
    swapProperties: swapProperties,
    Numeric: Numeric,
  },
  svg: {
    createNode: createNode,
    removeAttributes: removeAttributes,
    path: {
      donut: pathDonut,
      arc: pathArc,
      scale: pathScale,
    },
    element: {
      scalelabels: elementScaleLabels,
    },
  },
};
