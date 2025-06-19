import { colord } from "colord";
import { Color, ColorSource, ColorStop, Point } from "./Point";


function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function interpolateColor(c1: Color, c2: Color, t: number): Color {
  return [
    lerp(c1[0], c2[0], t),
    lerp(c1[1], c2[1], t),
    lerp(c1[2], c2[2], t),
  ];
}

export class LinearGradient implements ColorSource {
  from: Point;
  to: Point;
  colorStops: { offset: number; color: Color }[];

  constructor(from: Point, to: Point, colorStops: ColorStop[]) {
    this.from = from;
    this.to = to;

    this.colorStops = colorStops
      .map(cs => ({
        offset: cs.offset,
        color: this.normalizeColor(cs.color),
      }))
      .sort((a, b) => a.offset - b.offset);
  }

  private normalizeColor(input: string | Color): Color {
    if (Array.isArray(input)) {
      return input;
    }
    const { r, g, b } = colord(input).toRgb();
    return [r / 255, g / 255, b / 255];
  }

  private computeOffset(x: number, y: number): number {
    const dx = this.to.x - this.from.x;
    const dy = this.to.y - this.from.y;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return 0;

    const t = ((x - this.from.x) * dx + (y - this.from.y) * dy) / lenSq;
    return Math.max(0, Math.min(1, t));
  }

  getColor(x: number, y: number): Color {
    const offset = this.computeOffset(x, y);
    const stops = this.colorStops;

    if (offset <= stops[0].offset) return stops[0].color;
    if (offset >= stops[stops.length - 1].offset) return stops[stops.length - 1].color;

    const i = stops.findIndex(stop => stop.offset > offset);
    const left = stops[i - 1];
    const right = stops[i];
    const localT = (offset - left.offset) / (right.offset - left.offset);

    return interpolateColor(left.color, right.color, localT);
  }
}
