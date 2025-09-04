export interface PlotSettingsData {
  padding: number;
  showGrid?: boolean;
  numberOfTicks?: number;
  gridColor?: string;
  xAxisLowerBound: number;
  xAxisUpperBound: number;
  yAxisLowerBound: number;
  yAxisUpperBound: number;
  lineColor: string;
  lineWidth: number;
  lineTension: number;
  showPoints?: boolean;
  pointColor?: string;
  pointRadius?: number;
}
