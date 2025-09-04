import React from 'react';
import PlotTemplate from '../../templates/plot-template/PlotTemplate';
import type { PlotSettingsData } from 'types/PlotSettingsData';
import type { Size } from 'types/Size';

function PlotPage() {
  const [size, setSize] = React.useState<Size>({
    width: 500,
    height: 500,
  });

  const [plotSettingsData, setPlotSettingsData] =
    React.useState<PlotSettingsData>({
      padding: 20,
      showGrid: true,
      numberOfTicks: 10,
      gridColor: 'silver',
      xAxisLowerBound: -10,
      xAxisUpperBound: 10,
      yAxisLowerBound: -10,
      yAxisUpperBound: 10,
      lineColor: 'blue',
      lineWidth: 2,
      lineTension: 1.0,
      showPoints: true,
      pointColor: 'darkblue',
      pointRadius: 4,
    });

  return (
    <PlotTemplate
      size={size}
      updateSize={setSize}
      plotSettingsData={plotSettingsData}
      setPlotSettingsData={setPlotSettingsData}
    ></PlotTemplate>
  );
}

export default PlotPage;
