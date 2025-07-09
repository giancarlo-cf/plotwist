import styles from './Grid.module.css';

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {}

function Grid({ children, className, ...props }: GridProps) {
  return <div className={styles.grid + ' ' + className}>{children}</div>;
}

export default Grid;
