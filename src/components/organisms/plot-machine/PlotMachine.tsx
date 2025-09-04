import Button from '@components/atoms/button/Button';
import styles from './PlotMachine.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Size } from 'types/Size';
import SvgConverter from '@handlers/SvgConverter';
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
  async function downloadPlotAsImage() {
    const svgElement = document.getElementById('plot');
    if (!svgElement) {
      return;
    }

    SvgConverter.svgToPng(svgElement, size.width, size.height, 1).then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `plot-${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

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
        <Button iconButton onClick={downloadPlotAsImage}>
          <FontAwesomeIcon icon="image" size="lg" />
        </Button>
      </div>
      <div className={styles.plot_section}>{children}</div>
    </div>
  );
}

export default PlotMachine;
