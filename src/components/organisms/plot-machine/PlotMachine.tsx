import styles from './PlotMachine.module.css';
interface PlotMachineProps extends React.HTMLAttributes<HTMLDivElement> {}

function PlotMachine({ children, className, ...props }: PlotMachineProps) {
  return (
    <div className={[styles.plot_machine, className].join(' ')} {...props}>
      <div className={styles.plot_toolbar}></div>
      <div className={styles.plot_section}>{children}</div>
    </div>
  );
}

export default PlotMachine;
