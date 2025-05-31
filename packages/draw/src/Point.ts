export type Color = [number, number, number];

export interface ColorSource {
  getColor(x: number, y: number): Color;
}

export type ColorInput = Color | ColorSource;

export class Point {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;

  constructor(x: number, y: number, color?: ColorInput) {
    this.x = x;
    this.y = y;
    this.r = color ? resolveColor(color, x, y)[0] : 0;
    this.g = color ? resolveColor(color, x, y)[1] : 0;
    this.b = color ? resolveColor(color, x, y)[2] : 0;
  }
}

export function resolveColor(color: ColorInput, x: number, y: number): Color {
  if (Array.isArray(color)) {
    return color;
  } else {
    return color.getColor(x, y);
  }
}