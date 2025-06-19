import { ColorStop, Point } from "./Point";
import { LinearGradient} from "./LinearGradient";
import { RadialGradient } from "./RadialGradient";

export const GradientPresets = {
  /**
   * Classic rainbow gradient
   */
  rainbow(from: Point, to: Point): LinearGradient {
    const stops: ColorStop[] = [
      { offset: 0.0, color: "#FF0000" }, // Red
      { offset: 0.17, color: "#FF7F00" }, // Orange
      { offset: 0.33, color: "#FFFF00" }, // Yellow
      { offset: 0.5, color: "#00FF00" }, // Green
      { offset: 0.67, color: "#0000FF" }, // Blue
      { offset: 0.83, color: "#4B0082" }, // Indigo
      { offset: 1.0, color: "#9400D3" }, // Violet
    ];
    return new LinearGradient(from, to, stops);
  },

  /**
   * Fire gradient, great for simulating flame effects
   */
  fire(from: Point, to: Point): LinearGradient {
    const stops: ColorStop[] = [
      { offset: 0.0, color: "#FFFF00" }, // Bright yellow
      { offset: 0.2, color: "#FFA500" }, // Orange
      { offset: 0.4, color: "#FF4500" }, // Orange-red
      { offset: 0.6, color: "#FF0000" }, // Red
      { offset: 0.8, color: "#800000" }, // Deep red
      { offset: 1.0, color: "#000000" }, // Black/smoke
    ];
    return new LinearGradient(from, to, stops);
  },

  /**
   * Plasma effect (good for electric or magic effects)
   */
  plasma(from: Point, to: Point): LinearGradient {
    const stops: ColorStop[] = [
      { offset: 0.0, color: "#ffffcc" },
      { offset: 0.25, color: "#ffcc33" },
      { offset: 0.5, color: "#ff0066" },
      { offset: 0.75, color: "#6600cc" },
      { offset: 1.0, color: "#000066" },
    ];
    return new LinearGradient(from, to, stops);
  },

  /**
   * Radial fireball (for explosions or magic breath)
   */
  fireball(center: Point, radius: number): RadialGradient {
    const stops: ColorStop[] = [
      { offset: 0.0, color: "#ffff00" },
      { offset: 0.2, color: "#ff9900" },
      { offset: 0.4, color: "#ff3300" },
      { offset: 0.6, color: "#cc0000" },
      { offset: 0.8, color: "#660000" },
      { offset: 1.0, color: "#000000" },
    ];
    return new RadialGradient(center, radius, stops);
  },

  /**
   * Electric zap (white-blue transition)
   */
  electric(from: Point, to: Point): LinearGradient {
    const stops: ColorStop[] = [
      { offset: 0.0, color: "#ffffff" },
      { offset: 0.3, color: "#99ccff" },
      { offset: 0.6, color: "#3366ff" },
      { offset: 0.8, color: "#0000ff" },
      { offset: 1.0, color: "#000066" },
    ];
    return new LinearGradient(from, to, stops);
  },
};
