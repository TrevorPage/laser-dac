import { extend, Colord, colord } from "colord";
import { Color, ColorSource, ColorStop, Point } from "./Point";

import mixPlugin from "colord/plugins/mix";

extend([mixPlugin]);

export class RadialGradient implements ColorSource {
  center: Point;
  radius: number;
  colorStops: { offset: number; color: Colord }[];

  constructor(center: Point, radius: number, colorStops: ColorStop[]) {
    this.center = center;
    this.radius = radius;

    this.colorStops = colorStops
      .map(cs => ({
        offset: cs.offset,
        color: this.normalizeColor(cs.color),
      }))
      .sort((a, b) => a.offset - b.offset);
  }

  private normalizeColor(input: string | Color): Colord {
    if (Array.isArray(input)) {
      return colord({ r: input[0] * 255, g: input[1] * 255, b: input[2] * 255 });
    }
    return colord(input);
  }

  private computeOffset(x: number, y: number): number {
    const dx = x - this.center.x;
    const dy = y - this.center.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const t = dist / this.radius;
    return Math.max(0, Math.min(1, t));
  }

  private interpolateColor(t: number): Color {
    const stops = this.colorStops;
    if (t <= stops[0].offset) return this.toNormalizedColor(stops[0].color);
    if (t >= stops[stops.length - 1].offset)
      return this.toNormalizedColor(stops[stops.length - 1].color);

    const i = stops.findIndex(stop => stop.offset > t);
    const left = stops[i - 1];
    const right = stops[i];
    const localT = (t - left.offset) / (right.offset - left.offset);

    const interpolated = left.color.mix(right.color, localT);
    return this.toNormalizedColor(interpolated);
  }

  private toNormalizedColor(col: Colord): Color {
    const { r, g, b } = col.toRgb();
    return [r / 255, g / 255, b / 255];
  }

  getColor(x: number, y: number): Color {
    const offset = this.computeOffset(x, y);
    return this.interpolateColor(offset);
  }
}