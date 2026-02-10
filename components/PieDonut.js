import React from 'react';
import Svg, { Circle } from 'react-native-svg';

export default function PieDonut({ data, size, strokeWidth }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let offset = 0;

  return (
    <Svg width={size} height={size}>
      {data.map((item) => {
        const dash = (item.value / total) * circumference;
        const gap = circumference - dash;
        const circle = (
          <Circle
            key={item.name}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={item.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
            fill="transparent"
            strokeLinecap="round"
          />
        );
        offset += dash;
        return circle;
      })}
    </Svg>
  );
}
