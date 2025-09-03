import React from 'react';
import PlotTemplate from '../../templates/plot-template/PlotTemplate';
import type { PlotSettingsData } from 'types/PlotSettingsData';

function PlotPage() {
  const [plotSettingsData, setPlotSettingsData] =
    React.useState<PlotSettingsData>({
      padding: 20,
      showGrid: true,
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
      pointSize: 4,
    });

  return (
    <PlotTemplate
      plotSettingsData={plotSettingsData}
      setPlotSettingsData={setPlotSettingsData}
    ></PlotTemplate>
  );
}

export default PlotPage;
