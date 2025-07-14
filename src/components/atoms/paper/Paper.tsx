import styles from './Paper.module.css';
interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  ref: React.RefObject<HTMLDivElement | null>;
}

function Paper({ children, className, ...props }: PaperProps) {
  return (
    <div className={styles.paper + ' ' + className} {...props}>
      {children}
    </div>
  );
}

export default Paper;
