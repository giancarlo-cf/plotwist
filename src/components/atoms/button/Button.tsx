import styles from './Button.module.css';
interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  iconButton?: boolean;
}

function Button({
  iconButton,
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={styles.button + ' ' + className}
      style={{
        ...style,
        aspectRatio: iconButton ? '1 / 1' : style?.aspectRatio,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
