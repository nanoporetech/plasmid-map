import { ArrowPosition } from '../types/plasmid.type';
import { polarToCartesian, swapProperties, createNode, pathDonut, pathArc, pathScale, elementScaleLabels } from './index';

describe('utils', () => {
  describe('polarToCartesian', () => {
    it('converts a radius and angle (given origin) to coordinates', () => {
      expect(polarToCartesian(150, 150, 100, 45)).toEqual({
        x: 220.71067811865476,
        y: 79.28932188134526,
      });
    });
  });

  describe('swapProperties', () => {
    it('swaps attributes from one DOM element to another', () => {
      const text1 = createNode<SVGTextElement>('text', { id: 'i1', class: 'c1', name: 'n1', style: 'display: block', filter: 'f1', foo: 'bar' });
      const text2 = createNode<SVGTextElement>('text');

      expect(text1.getAttribute('id')).toEqual('i1');
      expect(text1.getAttribute('class')).toEqual('c1');
      expect(text1.getAttribute('name')).toEqual('n1');
      expect(text1.getAttribute('style')).toEqual('display: block;');
      expect(text1.getAttribute('filter')).toEqual('f1');
      expect(text1.getAttribute('foo')).toEqual('bar');

      expect(text2.getAttribute('id')).toBeNull();
      expect(text2.getAttribute('class')).toBeNull();
      expect(text2.getAttribute('name')).toBeNull();
      expect(text2.getAttribute('style')).toBeNull();
      expect(text2.getAttribute('filter')).toBeNull();
      expect(text2.getAttribute('foo')).toBeNull();

      swapProperties(text1, text2);

      expect(text1.getAttribute('id')).toBeNull();
      expect(text1.getAttribute('class')).toBeNull();
      expect(text1.getAttribute('name')).toBeNull();
      expect(text1.getAttribute('style')).toBeNull();
      expect(text1.getAttribute('filter')).toBeNull();
      expect(text1.getAttribute('foo')).toEqual('bar'); // Anything other than 'id', 'name', 'class', 'style', 'filter' is excluded from swap

      expect(text2.getAttribute('id')).toEqual('i1');
      expect(text2.getAttribute('class')).toEqual('c1');
      expect(text2.getAttribute('name')).toEqual('n1');
      expect(text2.getAttribute('style')).toEqual('display: block;');
      expect(text2.getAttribute('filter')).toEqual('f1');
      expect(text2.getAttribute('foo')).toBeNull();
    });
  });

  describe('createNode', () => {
    it('creates an SVG namespaced DOM element', () => {
      const text = createNode<SVGTextElement>('text', { foo: 'bar' });
      expect(text.tagName).toEqual('text');
      expect(text.getAttribute('foo')).toEqual('bar');
    });
    it('creates an SVG namespaced DOM element - and excludes specified elements', () => {
      const text = createNode<SVGTextElement>('text', { foo: 'bar', baz: 'excludeme' }, ['baz']);
      expect(text.tagName).toEqual('text');
      expect(text.getAttribute('foo')).toEqual('bar');
      expect(text.getAttribute('baz')).toBeNull();
    });
    it('creates an SVG namespaced DOM element - ignores null or empty values', () => {
      const text = createNode<SVGTextElement>('text', { foo: 'bar', baz: true, nul: null, empty: '' });
      expect(text.getAttribute('foo')).toEqual('bar');
      expect(text.getAttribute('baz')).toEqual('true');
      expect(text.getAttribute('nul')).toBeNull();
      expect(text.getAttribute('empty')).toBeNull();
    });
  });

  describe('pathDonut', () => {
    const x = 150;
    const y = 150;
    const radius = 100;
    const width = 5;
    it('creates a donut path', () => {
      expect(pathDonut(x, y, radius, width)).toEqual('M 149.98254670756864 50.00000152308709 A 100 100 0 1 0 150 50 M 149.98167404294708 45.00000159924144 A 105 105 0 1 0 150 45');
    });
  });

  describe('pathArc', () => {
    const x = 150;
    const y = 150;
    const radius = 100;
    const startAngle = 45;
    const endAngle = 90;
    const width = 10;
    const arrowStart: ArrowPosition = {
      width: 10,
      angle: 45,
      length: 10,
    };
    const arrowEnd: ArrowPosition = {
      width: 10,
      angle: 90,
      length: 10,
    };
    it('creates an arc - WITHOUT arrows', () => {
      expect(pathArc(x, y, radius, startAngle, endAngle, width)).toEqual(
        'M 250 150 A 100 100 0 0 0 220.71067811865476 79.28932188134526 L 220.71067811865476 79.28932188134526 L 224.2462120245875 75.75378797541252 L 227.78174593052023 72.21825406947978 L 227.78174593052023 72.21825406947978 A 110 110 0 0 1 260 150 L 260 150 L 255 150 L 250 150 L 250 150 z',
      );
    });
    it('creates an arc - WITH arrows', () => {
      expect(pathArc(x, y, radius, startAngle, endAngle, width, arrowStart, arrowEnd)).toEqual(
        'M 248.4807753012208 132.63518223330698 A 100 100 0 0 0 231.9152044288992 92.64235636489539 L 238.63269777109872 165.62833599002374 L 224.2462120245875 75.75378797541252 L 268.176930361465 170.83778132003164 L 240.10672487178908 86.90659200138494 A 110 110 0 0 1 258.3288528313429 130.89870045663767 L 129.16221867996836 31.82306963853503 L 255 150 L 134.37166400997629 61.36730222890128 L 248.4807753012208 132.63518223330698 z',
      );
    });
  });

  describe('pathScale', () => {
    const x = 150;
    const y = 150;
    const radius = 100;
    const interval = 5;
    const total = 50;
    const ticklength = 1;
    it('creates "null" path with defaults', () => {
      expect(pathScale()).toEqual('M 0,0');
    });
    it('creates path scale', () => {
      expect(pathScale(x, y, radius, interval, total, ticklength)).toEqual(
        'M150.0,50.0 L150.0,49.0 M208.8,69.1 L209.4,68.3 M245.1,119.1 L246.1,118.8 M245.1,180.9 L246.1,181.2 M208.8,230.9 L209.4,231.7 M150.0,250.0 L150.0,251.0 M91.2,230.9 L90.6,231.7 M54.9,180.9 L53.9,181.2 M54.9,119.1 L53.9,118.8 M91.2,69.1 L90.6,68.3',
      );
    });
  });

  describe('elementScaleLabels', () => {
    const x = 150;
    const y = 150;
    const radius = 100;
    const interval = 5;
    const total = 10;
    it('Returns scale labels and positions', () => {
      expect(elementScaleLabels(x, y, radius, interval, total)).toEqual([
        { text: 0, x: '150.0', y: '50.0' },
        { text: 5, x: '150.0', y: '250.0' },
      ]);
    });
  });
});
