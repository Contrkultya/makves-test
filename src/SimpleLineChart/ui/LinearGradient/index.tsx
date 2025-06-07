import type { Stop }  from "../../types";

export interface LinearGradientProps {
  id: string;
  stops: Stop[];
}

export const LinearGradient = ({ stops, id }: LinearGradientProps) => {
  return (
    <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
      {stops.map((stop, index) => (
        <stop key={index} {...stop} />
      ))}
    </linearGradient>
  );
};
