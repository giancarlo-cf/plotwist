import styles from './PlotTemplate.module.css';
import Grid from '@components/atoms/grid/Grid';
import PlotPaper from '@components/organisms/plot-paper/PlotPaper';
import PlotMachine from '@components/organisms/plot-machine/PlotMachine';
import React from 'react';

export interface Size {
  width: number;
  height: number;
}

function PlotTemplate() {
  const [paperSize, setPaperSize] = React.useState<Size>({
    width: 500,
    height: 500,
  });

  return (
    <Grid className={styles.grid}>
      <PlotMachine className={styles.plot_machine}>
        <PlotPaper
          style={{ ...paperSize }}
          setPaperSize={setPaperSize}
        ></PlotPaper>
      </PlotMachine>
    </Grid>
  );
}

export default PlotTemplate;
