import { Shape } from './Shape';
import { Color, Point } from './Point';
import { SceneOptions } from './Scene';
import { Wait } from './Wait';

// TODO: I don't like these options being duplicated in the class
// I have a feeling there is a better way...
interface CircleOptions {
  x: number;
  y: number;
  radius: number;
  color: Color;
  extentAngle?: number;
  startAngle?: number;
}

export class Circle extends Shape {
  x: number;
  y: number;
  radius: number;
  color: Color;
  extentAngle?: number;
  startAngle?: number;  

  constructor(options: CircleOptions) {
    super();
    this.x = options.x;
    this.y = options.y;
    this.radius = options.radius;
    this.color = options.color;
    this.extentAngle = options.extentAngle;
    this.startAngle = options.startAngle;
  }

  draw(options: SceneOptions): Point[] {
    const circumference = 2.0 * this.radius * Math.PI;
    const pointCount = Math.round(circumference * options.resolution);
    const extentRadians = this.extentAngle ? (this.extentAngle * Math.PI) / 180.0 : Math.PI * 2;
    const startRadians = this.startAngle ? (this.startAngle * Math.PI) / 180.0 : 0;

    const points: Point[] = new Wait({
      x: this.x - this.radius * Math.cos(startRadians),
      y: this.y + this.radius * Math.sin(startRadians),
      color: [0, 0, 0],
      amount: options.blankingPoints
    }).draw();

    // If there are less then 3 points just return blank
    if (pointCount < 3) {
      return points;
    }

    const stepSize = (Math.PI * 2) / pointCount;
    for (let i: number = startRadians; i < (extentRadians + startRadians); i += stepSize) {
      points.push(
        new Point(
          this.x - this.radius * Math.cos(i),
          this.y + this.radius * Math.sin(i),
          this.color
        )
      );
    }

    // Close circle
    points.push(
      new Point(
        this.x - this.radius * Math.cos(extentRadians + startRadians),
        this.y + this.radius * Math.sin(extentRadians + startRadians),
        this.color)
    );

    //console.log("blanking point is at x:", this.x + this.radius, "y:", this.y);

    // Blank after
    return points.concat(
      new Wait({
        x: this.x - this.radius * Math.cos(extentRadians + startRadians),
        y: this.y + this.radius * Math.sin(extentRadians + startRadians),
        color: this.color,
        amount: options.maxWaitPoints / 2
      }).draw()
    );
  }
}
