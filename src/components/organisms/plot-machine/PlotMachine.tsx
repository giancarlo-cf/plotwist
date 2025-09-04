import Button from '@components/atoms/button/Button';
import styles from './PlotMachine.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Size } from 'types/Size';
interface PlotMachineProps extends React.HTMLAttributes<HTMLDivElement> {
  toggleSettings: () => void;
  size: Size;
  updateSize: React.Dispatch<React.SetStateAction<Size>>;
}

function PlotMachine({
  toggleSettings,
  size,
  updateSize,
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
        <div className={styles.size_inputs}>
          <input
            type="number"
            id="width"
            value={size.width}
            onChange={(e) =>
              updateSize({ ...size, width: Number(e.target.value) })
            }
          />
          <span>x</span>
          <input
            type="number"
            id="height"
            value={size.height}
            onChange={(e) =>
              updateSize({ ...size, height: Number(e.target.value) })
            }
          />
        </div>
      </div>
      <div className={styles.plot_section}>{children}</div>
    </div>
  );
}

export default PlotMachine;
