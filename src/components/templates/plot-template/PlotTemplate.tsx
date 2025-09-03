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

interface PlotTemplateProps {
  plotSettingsData: PlotSettingsData;
  setPlotSettingsData: React.Dispatch<React.SetStateAction<PlotSettingsData>>;
}

function PlotTemplate({
  plotSettingsData,
  setPlotSettingsData,
}: PlotTemplateProps) {
  const [paperSize, setPaperSize] = React.useState<Size>({
    width: 500,
    height: 500,
  });

  const [settingsOpen, setSettingsOpen] = React.useState<boolean>(false);

  function toggleSettings(): void {
    setSettingsOpen((prev: boolean) => !prev);
  }

  return (
    <Grid className={styles.grid}>
      {settingsOpen &&
        createPortal(
          <PlotSettings
            data={plotSettingsData}
            setData={setPlotSettingsData}
            className={styles.plot_settings}
          />,
          document.body
        )}
      <PlotMachine
        toggleSettings={toggleSettings}
        className={styles.plot_machine}
      >
        <PlotPaper style={{ ...paperSize }} setPaperSize={setPaperSize}>
          <Plot settings={plotSettingsData} size={paperSize} />
        </PlotPaper>
      </PlotMachine>
    </Grid>
  );
}

export default PlotTemplate;
