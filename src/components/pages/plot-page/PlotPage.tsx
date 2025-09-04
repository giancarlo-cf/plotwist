import React from 'react';
import PlotTemplate from '../../templates/plot-template/PlotTemplate';
import type { PlotSettingsData } from 'types/PlotSettingsData';
import type { Size } from 'types/Size';
import type { PlotData } from 'types/PlotData';

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
      gridColor: '#BFBFBF',
      xAxisLowerBound: -10,
      xAxisUpperBound: 10,
      yAxisLowerBound: -10,
      yAxisUpperBound: 10,
      lineColor: '#3534B3',
      lineWidth: 2,
      lineTension: 1.0,
      showPoints: true,
      pointColor: '#181854',
      pointRadius: 4,
    });

  const [plotData, setPlotData] = React.useState<PlotData[]>([]);

  return (
    <PlotTemplate
      size={size}
      updateSize={setSize}
      plotSettingsData={plotSettingsData}
      setPlotSettingsData={setPlotSettingsData}
      plotData={plotData}
      setPlotData={setPlotData}
    ></PlotTemplate>
  );
}

export default PlotPage;
