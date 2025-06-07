import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { data } from "./mocks";
import { calcZScores, createLinearGradientStops } from "./utils";
import { LINEAR_GRADIENTS, LINES } from "./constants";
import { CustomDot } from "./ui/CustomDot";
import { LinearGradient } from "./ui";

export const SimpleLineChart = () => {
  const enrichedData = useMemo(() => {
    const pvZScores = calcZScores(data.map((d) => d.pv));
    const uvZScores = calcZScores(data.map((d) => d.uv));

    return data.map((item, index) => ({
      ...item,
      pvZScore: pvZScores[index],
      uvZScore: uvZScores[index],
    }));
  }, []);

  const pvStops = createLinearGradientStops(enrichedData, LINES.pv, "pvZScore");
  const uvStops = createLinearGradientStops(enrichedData, LINES.uv, "uvZScore");

  return (
    <ResponsiveContainer width="95%" height={500}>
      <LineChart data={enrichedData} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <defs>
          <LinearGradient id={LINEAR_GRADIENTS.pv} stops={pvStops} />
          <LinearGradient id={LINEAR_GRADIENTS.uv} stops={uvStops} />
        </defs>
        <Line
          type="monotone"
          dataKey={LINES.pv}
          stroke={`url(#${LINEAR_GRADIENTS.pv})`}
          dot={<CustomDot dataKey={LINES.pv} />}
          activeDot={<CustomDot dataKey={LINES.pv} isActive />}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey={LINES.uv}
          stroke={`url(#${LINEAR_GRADIENTS.uv})`}
          dot={<CustomDot dataKey={LINES.uv} />}
          activeDot={<CustomDot dataKey={LINES.uv} isActive />}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
