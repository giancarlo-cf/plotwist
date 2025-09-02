import Button from '@components/atoms/button/Button';
import styles from './PlotMachine.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
interface PlotMachineProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleSettings: () => void;
}

function PlotMachine({
  toggleSettings,
  children,
  className,
  ...props
}: PlotMachineProps) {
  return (
    <div className={[styles.plot_machine, className].join(' ')} {...props}>
      <div className={styles.plot_toolbar}>
        <Button iconButton onClick={toggleSettings}>
          <FontAwesomeIcon icon="sliders" size="lg" />
        </Button>
      </div>
      <div className={styles.plot_section}>{children}</div>
    </div>
  );
}

export default PlotMachine;
