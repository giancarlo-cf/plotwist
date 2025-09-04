import React from 'react';
import type { PlotSettingsData } from 'types/PlotSettingsData';
import type { Size } from 'types/Size';

interface AxisProps extends React.SVGProps<SVGSVGElement> {
  plotSize: Size;
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  orientation: 'horizontal' | 'vertical';
  plotSettings: PlotSettingsData;
}

function Axis({
  plotSize,
  xScale,
  yScale,
  orientation,
  plotSettings,
  ...props
}: AxisProps) {
  const { width, height } = plotSize;
  const { numberOfTicks, padding, showGrid, gridColor } = plotSettings;

  const isHorizontal = orientation === 'horizontal';

  const ticks = isHorizontal
    ? xScale.ticks(numberOfTicks).map((value) => ({
        value,
        offset: xScale(value),
      }))
    : yScale.ticks(numberOfTicks).map((value) => ({
        value,
        offset: yScale(value),
      }));

  const d: string = isHorizontal
    ? ['M', padding, yScale(0), 'H', width - padding].join(' ')
    : ['M', xScale(0), padding, 'V', height - padding].join(' ');

  return (
    <svg {...props}>
      <path d={d} fill="none" stroke="currentColor" />
      {ticks.map(({ value, offset }) => (
        <g
          key={value}
          transform={
            isHorizontal ? `translate(${offset}, 0)` : `translate(0, ${offset})`
          }
        >
          {isHorizontal ? (
            <line
              y1={showGrid ? padding : yScale(0)}
              y2={showGrid ? height - padding : yScale(0) + 6}
              stroke={showGrid ? gridColor : 'currentColor'}
            />
          ) : (
            <line
              x1={showGrid ? padding : xScale(0)}
              x2={showGrid ? width - padding : xScale(0) + 6}
              stroke={showGrid ? gridColor : 'currentColor'}
            />
          )}
          <text
            key={value}
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: isHorizontal
                ? `translateY(${yScale(0) + 10}px)`
                : `translate(${xScale(0) + 10}px, 3.5px)`,
              userSelect: 'none',
              fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
            }}
          >
            {value}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default Axis;
