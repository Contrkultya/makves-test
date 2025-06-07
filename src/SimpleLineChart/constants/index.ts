export const LINES = {
  uv: "uv",
  pv: "pv",
} as const;

export const COLORS = {
  blue: "#00ff00",
  purple: "#0000ff",
  red: "#ff0000",
} as const;

export const LINEAR_GRADIENTS = {
  uv: "uvGradient",
  pv: "pvGradient",
};

export const LEGEND_LINES = [
  {
    name: "pv",
    bg: COLORS.purple,
  },
  {
    name: "uv",
    bg: COLORS.blue,
  },
  {
    name: "|z-score| > 1",
    bg: COLORS.red,
  },
];
