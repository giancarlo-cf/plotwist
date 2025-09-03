import type { PlotSettingsData } from 'types/PlotSettingsData';
import styles from './PlotSettings.module.css';

interface PlotSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PlotSettingsData;
  setData: React.Dispatch<React.SetStateAction<PlotSettingsData>>;
}

function PlotSettings({ className, ...props }: PlotSettingsProps) {
  return (
    <div className={styles.plot_settings + ' ' + className} {...props}></div>
  );
}

export default PlotSettings;
