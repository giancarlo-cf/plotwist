import Axis from '@components/atoms/axis/Axis';
import * as d3 from 'd3';
import React, { useEffect, useState } from 'react';
import type { PlotSettingsData } from 'types/PlotSettingsData';
import type { Size } from 'types/Size';

interface PlotProps {
  size: Size;
  settings: PlotSettingsData;
}

function Plot({ size, settings }: PlotProps) {
  const {
    padding,
    xAxisLowerBound,
    xAxisUpperBound,
    yAxisLowerBound,
    yAxisUpperBound,
    lineTension,
    lineColor,
    lineWidth,
    showPoints,
    pointColor,
    pointSize,
  }: PlotSettingsData = settings;
  const { width, height } = size;

  const [line, setLine] = useState<d3.Line<{ x: number; y: number }> | null>(
    null
  );
  const [xScale, setXScale] = useState<d3.ScaleLinear<number, number> | null>(
    null
  );
  const [yScale, setYScale] = useState<d3.ScaleLinear<number, number> | null>(
    null
  );

  const data = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 8 },
  ];

  useEffect(() => {
    const newXScale = d3.scaleLinear(
      [xAxisLowerBound, xAxisUpperBound],
      [padding, width - padding]
    );
    const newYScale = d3.scaleLinear(
      [yAxisLowerBound, yAxisUpperBound],
      [height - padding, padding]
    );
    setXScale(() => newXScale);
    setYScale(() => newYScale);
  }, [width, height, settings]);

  useEffect(() => {
    if (!xScale || !yScale) return;
    const line = d3
      .line<{ x: number; y: number }>()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .curve(d3.curveCardinal.tension(lineTension));

    setLine(() => line);
  }, [xScale, yScale]);

  return (
    <svg width={width} height={height}>
      {xScale && yScale && (
        <React.Fragment>
          <Axis
            plotSize={size}
            xScale={xScale}
            yScale={yScale}
            orientation="horizontal"
            plotSettings={settings}
          />
          <Axis
            plotSize={size}
            xScale={xScale}
            yScale={yScale}
            orientation="vertical"
            plotSettings={settings}
          />
        </React.Fragment>
      )}
      {line && (
        <path
          fill="none"
          stroke={lineColor}
          strokeWidth={lineWidth}
          d={line(data) ?? undefined}
        />
      )}
      {showPoints && xScale && yScale && (
        <g fill="white" stroke={pointColor} strokeWidth={lineWidth}>
          {data.map((point, index) => (
            <circle
              key={index}
              cx={xScale(point.x)}
              cy={yScale(point.y)}
              r={pointSize}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

export default Plot;
