import "./color.css";

export type HeatmapColorClass =
  | "color-empty"
  | "color-scale-1"
  | "color-scale-2"
  | "color-scale-3"
  | "color-scale-4";

export const getColor = (count: number): HeatmapColorClass => {
  if (count === 1) {
    return "color-scale-1";
  } else if (count === 2) {
    return "color-scale-2";
  } else if (count === 3) {
    return "color-scale-3";
  } else if (count >= 4) {
    return "color-scale-4";
  }
  return "color-empty";
};
