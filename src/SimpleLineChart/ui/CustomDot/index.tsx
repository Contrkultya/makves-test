import { COLORS, LINES } from "../../constants";
import { type Point } from "../../types";

export interface CustomDotProps {
  dataKey: "pv" | "uv";
  cx?: number;
  cy?: number;
  isActive?: boolean;
  payload?: Point;
}

export const CustomDot = ({ cx, cy, payload, dataKey, isActive }: CustomDotProps) => {
  if (!cx || !cy || !payload) return null;

  const zScore = dataKey === LINES.pv ? payload.pvZScore : payload.uvZScore;
  const defaultColor = dataKey === LINES.pv ? COLORS.purple : COLORS.blue;
  const color = Math.abs(zScore || 0) > 1 ? COLORS.red : defaultColor;

  return <circle cx={cx} cy={cy} r={isActive ? 8 : 4} fill={color} />;
};
