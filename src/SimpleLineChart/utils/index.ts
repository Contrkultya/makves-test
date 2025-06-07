import { LINES, COLORS } from "../constants";
import type { Point, Stop } from "../types";

export const calcAverageValue = (data: number[]) => {
  return (
    data.reduce((acc, num) => {
      acc += num;
      return acc;
    }, 0) / data.length
  );
};

export const calcStandardDeviation = (data: number[], averageValue: number) => {
  const numerator = data.reduce((acc, num) => {
    const diff = Number((num - averageValue).toFixed(3));
    acc += Math.pow(diff, 2);
    return acc;
  }, 0);
  const denominator = data.length - 1;

  return Math.sqrt(numerator / denominator);
};

export const calcZScores = (data: number[]) => {
  const averageValue = calcAverageValue(data);
  const standardDeviation = calcStandardDeviation(data, averageValue);
  return data.map((value) => Math.round((value - averageValue) / standardDeviation));
};

export const createLinearGradientStops = (
  data: Point[],
  key: keyof typeof LINES,
  zScoreKey: "pvZScore" | "uvZScore"
) => {
  const stops: Stop[] = [];
  const totalPoints = data.length - 1;
  const defaultColor = key === LINES.pv ? COLORS.purple : COLORS.blue;
  const firstZScore = data[0][zScoreKey] ?? 0;
  const lastZScore = data[data.length - 1][zScoreKey] || 0;

  stops.push({
    offset: "0%",
    stopColor: Math.abs(firstZScore) > 1 ? COLORS.red : defaultColor,
  });

  for (let i = 1; i < data.length; i++) {
    const prevZScore = data[i - 1][zScoreKey] || 0;
    const currentZScore = data[i][zScoreKey] || 0;
    const percentage = (i / totalPoints) * 100;
    const currentColor = Math.abs(currentZScore) > 1 ? COLORS.red : defaultColor;
    const prevColor = Math.abs(prevZScore) > 1 ? COLORS.red : defaultColor;

    if (prevColor !== currentColor) {
      stops.push(
        {
          offset: `${percentage}%`,
          stopColor: prevColor,
        },
        {
          offset: `${percentage}%`,
          stopColor: currentColor,
        }
      );
    }
  }

  stops.push({
    offset: "100%",
    stopColor: Math.abs(lastZScore) > 1 ? COLORS.red : defaultColor,
  });

  return stops;
};
