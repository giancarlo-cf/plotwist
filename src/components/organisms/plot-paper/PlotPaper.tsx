import React, { useRef } from 'react';
import styles from './PlotPaper.module.css';
import Paper from '@components/atoms/paper/Paper';
import type { Size } from '@components/templates/plot-template/PlotTemplate';

interface PlotPaperProps extends React.HTMLAttributes<HTMLDivElement> {
  setPaperSize: React.Dispatch<React.SetStateAction<Size>>;
}

type CursorPosition =
  | 'top'
  | 'topright'
  | 'right'
  | 'bottomright'
  | 'bottom'
  | 'bottomleft'
  | 'left'
  | 'topleft'
  | null;

const BORDER_OFFSET: number = 5;
const DOTS_OFFSET: number = 2;

function PlotPaper({
  children,
  style,
  setPaperSize,
  ...props
}: PlotPaperProps) {
  const paperRef = useRef<HTMLDivElement | null>(null);

  const [resizeMode, setResizeMode] = React.useState<boolean>(false);

  function toggleResizeMode(): void {
    setResizeMode((prev: boolean) => !prev);
  }

  const [paperHovered, setPaperHovered] = React.useState<boolean>(false);

  function onPaperMouseEnter(): void {
    setPaperHovered(true);
  }

  function onPaperMouseLeave(): void {
    setPaperHovered(false);
  }

  const [outlineHovered, setOutlineHovered] = React.useState<boolean>(false);
  const [cursorPosition, setCursorPosition] = React.useState<CursorPosition>();

  const [resizing, setResizing] = React.useState<boolean>(false);

  function getCursor(): string {
    console.log(outlineHovered, cursorPosition);
    if (!outlineHovered) return '';
    switch (cursorPosition) {
      case 'top':
        return 'n-resize';
      case 'topright':
        return 'ne-resize';
      case 'right':
        return 'e-resize';
      case 'bottomright':
        return 'se-resize';
      case 'bottom':
        return 's-resize';
      case 'bottomleft':
        return 'sw-resize';
      case 'left':
        return 'w-resize';
      case 'topleft':
        return 'nw-resize';
    }
    return '';
  }

  function onPaperBorderMouseOver(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    if (!paperRef || !paperRef.current || !resizeMode || resizing) {
      return;
    }

    const paperRect: DOMRect = paperRef.current.getBoundingClientRect();

    const relativeX: number = event.clientX - paperRect.x;
    const relativeY: number = event.clientY - paperRect.y;

    let position: string = '';

    if (-BORDER_OFFSET <= relativeY && relativeY <= BORDER_OFFSET) {
      position += 'top';
    } else {
      const distanceY: number = relativeY - paperRect.height;
      if (BORDER_OFFSET >= distanceY && distanceY >= -BORDER_OFFSET) {
        position += 'bottom';
      }
    }

    if (-BORDER_OFFSET <= relativeX && relativeX <= BORDER_OFFSET) {
      position += 'left';
    } else {
      const distanceX: number = relativeX - paperRect.width;
      if (BORDER_OFFSET >= distanceX && distanceX >= -BORDER_OFFSET) {
        position += 'right';
      }
    }

    setCursorPosition(position === '' ? null : (position as CursorPosition));
    if (position != '') {
      setOutlineHovered(true);
    }
  }

  function onPaperBorderMouseLeave(): void {
    if (resizing) return;
    setCursorPosition(null);
    setOutlineHovered(false);
  }

  function onPaperBorderMouseDown() {
    if (outlineHovered && cursorPosition !== null) {
      setResizing(true);
    }
  }

  function onPaperBorderMouseUp() {
    if (resizing) return;
    toggleResizeMode();
  }

  function onBodyMouseUp() {
    if (!resizing) return;
    setResizing(false);
    setCursorPosition(null);
    setOutlineHovered(false);
  }

  function onBodyMouseOver(event: MouseEvent) {
    if (!paperRef || !paperRef.current || !resizing) return;
    const paperRect: DOMRect = paperRef.current.getBoundingClientRect();
    const relativeX: number = event.clientX - paperRect.x;
    const relativeY: number = event.clientY - paperRect.y;

    switch (cursorPosition) {
      case 'top':
        setPaperSize({
          width: paperRect.width,
          height: paperRect.height + relativeY * -1,
        });
        break;
      case 'topright':
        setPaperSize({
          width: relativeX,
          height: paperRect.height + relativeY * -1,
        });
        break;
      case 'right':
        setPaperSize({ width: relativeX, height: paperRect.height });
        break;
      case 'bottomright':
        setPaperSize({
          width: relativeX,
          height: relativeY,
        });
        break;
      case 'bottom':
        setPaperSize({
          width: paperRect.width,
          height: relativeY,
        });
        break;
      case 'bottomleft':
        setPaperSize({
          width: paperRect.width + relativeX * -1,
          height: relativeY,
        });
        break;
      case 'left':
        setPaperSize({
          width: paperRect.width + relativeX * -1,
          height: paperRect.height,
        });
        break;
      case 'topleft':
        setPaperSize({
          width: paperRect.width + relativeX * -1,
          height: paperRect.height + relativeY * -1,
        });
        break;
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('mousemove', onBodyMouseOver);
    document.body.addEventListener('mouseup', onBodyMouseUp);
    return () => {
      document.body.removeEventListener('mousemove', onBodyMouseOver);
      document.body.removeEventListener('mouseup', onBodyMouseUp);
    };
  }, [paperRef, resizing]);

  React.useEffect(() => {
    document.body.style.cursor = getCursor();
  }, [cursorPosition]);

  return (
    <Paper
      ref={paperRef}
      onMouseEnter={onPaperMouseEnter}
      onMouseLeave={onPaperMouseLeave}
      style={{ ...style }}
      {...props}
    >
      {(paperHovered || resizeMode) && (
        <div
          onMouseMove={onPaperBorderMouseOver}
          onMouseLeave={onPaperBorderMouseLeave}
          onMouseDown={onPaperBorderMouseDown}
          onMouseUp={onPaperBorderMouseUp}
          className={styles.paper_border}
          style={{ outlineStyle: resizeMode ? 'dashed' : 'solid' }}
        >
          {resizeMode && (
            <div className={styles.paper_resize_dots}>
              <div
                className={styles.paper_resize_dot}
                style={{ top: -DOTS_OFFSET, right: -DOTS_OFFSET }}
              />
              <div
                className={styles.paper_resize_dot}
                style={{ top: -DOTS_OFFSET, left: -DOTS_OFFSET }}
              />
              <div
                className={styles.paper_resize_dot}
                style={{ bottom: -DOTS_OFFSET, right: -DOTS_OFFSET }}
              />
              <div
                className={styles.paper_resize_dot}
                style={{ bottom: -DOTS_OFFSET, left: -DOTS_OFFSET }}
              />
            </div>
          )}
        </div>
      )}

      {children}
    </Paper>
  );
}

export default PlotPaper;
