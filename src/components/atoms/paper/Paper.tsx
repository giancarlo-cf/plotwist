import styles from './Paper.module.css';
interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {}

function Paper({ children, className, ...props }: PaperProps) {
  return <div className={styles.paper + ' ' + className} {...props}></div>;
}

export default Paper;
