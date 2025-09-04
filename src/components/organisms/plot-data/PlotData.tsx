import type { PlotData as PlotDataType } from 'types/PlotData';
import styles from './PlotData.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@components/atoms/button/Button';

interface PlotDataProps extends React.HTMLAttributes<HTMLDivElement> {
  data: PlotDataType[];
  setData: React.Dispatch<React.SetStateAction<PlotDataType[]>>;
}

function PlotData({ data, setData, className, ...props }: PlotDataProps) {
  function insertNewDataPointAt(index: number): void {
    const newData = [...data];
    newData.splice(index + 1, 0, { x: 0, y: 0 });
    setData(newData);
  }

  function moveDataPointAt(index: number, offset: number): void {
    if (index === 0 && offset < 0) return;
    if (index === data.length - 1 && offset > 0) return;
    const newData = [...data];
    const temp = newData[index + offset];
    newData[index + offset] = newData[index];
    newData[index] = temp;
    setData(newData);
  }

  function removeDataPointAt(index: number): void {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  }

  return (
    <div className={styles.plot_data + ' ' + className} {...props}>
      <div className={styles.plot_data_title}>
        <h2>Plot Data</h2>
        <Button iconButton onClick={() => insertNewDataPointAt(0)}>
          <FontAwesomeIcon icon="plus" size="lg" />
        </Button>
      </div>
      {data.map((point, index) => (
        <div key={index} className={styles.plot_data_point}>
          <Button iconButton onClick={() => moveDataPointAt(index, -1)}>
            <FontAwesomeIcon icon="up-long" size="lg" />
          </Button>
          <Button iconButton onClick={() => moveDataPointAt(index, 1)}>
            <FontAwesomeIcon icon="down-long" size="lg" />
          </Button>
          <input
            type="number"
            id={`x-${index}`}
            value={point.x}
            onChange={(e) => {
              const newData = [...data];
              newData[index].x = Number(e.target.value);
              setData(newData);
            }}
          />
          <input
            type="number"
            id={`y-${index}`}
            value={point.y}
            onChange={(e) => {
              const newData = [...data];
              newData[index].y = Number(e.target.value);
              setData(newData);
            }}
          />
          <Button iconButton onClick={() => removeDataPointAt(index)}>
            <FontAwesomeIcon icon="minus" size="lg" />
          </Button>
          <Button iconButton onClick={() => insertNewDataPointAt(index)}>
            <FontAwesomeIcon icon="plus" size="lg" />
          </Button>
        </div>
      ))}
    </div>
  );
}

export default PlotData;
