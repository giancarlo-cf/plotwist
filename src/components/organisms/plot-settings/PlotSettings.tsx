import type { PlotSettingsData } from 'types/PlotSettingsData';
import styles from './PlotSettings.module.css';
import React from 'react';

interface PlotSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PlotSettingsData;
  setData: React.Dispatch<React.SetStateAction<PlotSettingsData>>;
}

function PlotSettings({
  data,
  setData,
  className,
  ...props
}: PlotSettingsProps) {
  function updateSetting<K extends keyof PlotSettingsData>(
    key: K,
    value: PlotSettingsData[K]
  ) {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }

  return (
    <div className={styles.plot_settings + ' ' + className} {...props}>
      <h2>Plot Settings</h2>
      <div className={styles.setting}>
        <label htmlFor="padding">Padding:</label>
        <input
          type="number"
          id="padding"
          value={data.padding}
          onChange={(e) => updateSetting('padding', Number(e.target.value))}
        />
      </div>
      <div className={styles.setting}>
        <label htmlFor="padding">Number of Ticks:</label>
        <input
          type="number"
          id="numberOfTicks"
          value={data.numberOfTicks}
          onChange={(e) =>
            updateSetting('numberOfTicks', Number(e.target.value))
          }
        />
      </div>
      <div className={styles.setting}>
        <label htmlFor="padding">X-Axis Bounds:</label>
        <div className={styles.axis_bounds}>
          <input
            type="number"
            id="xAxisLowerBound"
            value={data.xAxisLowerBound}
            onChange={(e) =>
              updateSetting('xAxisLowerBound', Number(e.target.value))
            }
          />
          <span>to</span>
          <input
            type="number"
            id="xAxisUpperBound"
            value={data.xAxisUpperBound}
            onChange={(e) =>
              updateSetting('xAxisUpperBound', Number(e.target.value))
            }
          />
        </div>
      </div>
      <div className={styles.setting}>
        <label htmlFor="padding">Y-Axis Bounds:</label>
        <div className={styles.axis_bounds}>
          <input
            type="number"
            id="yAxisLowerBound"
            value={data.yAxisLowerBound}
            onChange={(e) =>
              updateSetting('yAxisLowerBound', Number(e.target.value))
            }
          />
          <span>to</span>
          <input
            type="number"
            id="yAxisUpperBound"
            value={data.yAxisUpperBound}
            onChange={(e) =>
              updateSetting('yAxisUpperBound', Number(e.target.value))
            }
          />
        </div>
      </div>
      <div className={styles.checkbox_setting}>
        <label htmlFor="padding">Show Grid:</label>
        <input
          type="checkbox"
          id="showGrid"
          checked={data.showGrid}
          onChange={(e) => updateSetting('showGrid', e.target.checked)}
        />
      </div>
      {data.showGrid && (
        <div className={styles.color_setting}>
          <label htmlFor="gridColor">Grid Color:</label>
          <input
            type="color"
            id="gridColor"
            value={data.gridColor}
            onChange={(e) => updateSetting('gridColor', e.target.value)}
          />
        </div>
      )}
      <div className={styles.setting}>
        <label htmlFor="padding">Line Width:</label>
        <input
          type="number"
          id="lineWidth"
          value={data.lineWidth}
          onChange={(e) => updateSetting('lineWidth', Number(e.target.value))}
        />
      </div>
      <div className={styles.range_setting}>
        <label htmlFor="padding">Line Tension:</label>
        <input
          type="range"
          id="lineTension"
          value={data.lineTension}
          onChange={(e) => updateSetting('lineTension', Number(e.target.value))}
          min={0}
          max={1}
          step={0.01}
        />
      </div>
      <div className={styles.color_setting}>
        <label htmlFor="lineColor">Line Color:</label>
        <input
          type="color"
          id="lineColor"
          value={data.lineColor}
          onChange={(e) => updateSetting('lineColor', e.target.value)}
        />
      </div>
      <div className={styles.checkbox_setting}>
        <label htmlFor="padding">Show Points:</label>
        <input
          type="checkbox"
          id="showPoints"
          checked={data.showPoints}
          onChange={(e) => updateSetting('showPoints', e.target.checked)}
        />
      </div>
      {data.showPoints && (
        <React.Fragment>
          <div className={styles.color_setting}>
            <label htmlFor="gridColor">Points Color:</label>
            <input
              type="color"
              id="pointColor"
              value={data.pointColor}
              onChange={(e) => updateSetting('pointColor', e.target.value)}
            />
          </div>
          <div className={styles.range_setting}>
            <label htmlFor="padding">Points Radius:</label>
            <input
              type="range"
              id="pointRadius"
              value={data.pointRadius}
              onChange={(e) =>
                updateSetting('pointRadius', Number(e.target.value))
              }
              min={0.5}
              max={8}
              step={0.01}
            />
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default PlotSettings;
