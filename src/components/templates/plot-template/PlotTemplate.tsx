import styles from './PlotTemplate.module.css';
import Grid from '@components/atoms/grid/Grid';
import PlotPaper from '@components/organisms/plot-paper/PlotPaper';
import PlotMachine from '@components/organisms/plot-machine/PlotMachine';
import React from 'react';
import Plot from '@components/organisms/plot/Plot';
import PlotSettings from '@components/organisms/plot-settings/PlotSettings';
import { createPortal } from 'react-dom';
import type { Size } from 'types/Size';
import type { PlotSettingsData } from 'types/PlotSettingsData';
import PlotData from '@components/organisms/plot-data/PlotData';
import type { PlotData as PlotDataType } from 'types/PlotData';

interface PlotTemplateProps {
  size: Size;
  updateSize: React.Dispatch<React.SetStateAction<Size>>;
  plotData: PlotDataType[];
  setPlotData: React.Dispatch<React.SetStateAction<PlotDataType[]>>;
  plotSettingsData: PlotSettingsData;
  setPlotSettingsData: React.Dispatch<React.SetStateAction<PlotSettingsData>>;
}

function PlotTemplate({
  size,
  updateSize,
  plotData,
  setPlotData,
  plotSettingsData,
  setPlotSettingsData,
}: PlotTemplateProps) {
  const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);

  function toggleSettings(): void {
    setSettingsOpen((prev: boolean) => !prev);
  }

  const [dataOpen, setDataOpen] = React.useState<boolean>(false);
  function toggleData(): void {
    setDataOpen((prev: boolean) => !prev);
  }

  return (
    <Grid className={styles.grid}>
      {settingsOpen &&
        createPortal(
          <PlotSettings
            toggle={toggleSettings}
            data={plotSettingsData}
            setData={setPlotSettingsData}
            className={styles.plot_settings}
          />,
          document.body
        )}
      {dataOpen &&
        createPortal(
          <PlotData
            toggle={toggleData}
            data={plotData}
            setData={setPlotData}
            className={styles.plot_data}
          />,
          document.body
        )}
      <PlotMachine
        size={size}
        updateSize={updateSize}
        toggleSettings={toggleSettings}
        toggleData={toggleData}
        className={styles.plot_machine}
      >
        <PlotPaper style={{ ...size }} setPaperSize={updateSize}>
          <Plot settings={plotSettingsData} data={plotData} size={size} />
        </PlotPaper>
      </PlotMachine>
    </Grid>
  );
}

export default PlotTemplate;
