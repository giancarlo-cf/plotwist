import Paper from '@components/atoms/paper/Paper';

interface PlotPaperProps extends React.HTMLAttributes<HTMLDivElement> {}

function PlotPaper({ children, ...props }: PlotPaperProps) {
  return <Paper {...props}>{children}</Paper>;
}

export default PlotPaper;
