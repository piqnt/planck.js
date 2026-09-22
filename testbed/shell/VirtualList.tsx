import React from "react";

interface VirtualListProps<T> {
  items: T[];
  /** one row's height, px; a row is one line of the list */
  rowHeight: number;
  /** the box shows this many rows and scrolls through the rest */
  visibleRows: number;
  /** rows an item takes: 1, or more when it is expanded */
  rowsOf: (item: T, index: number) => number;
  keyOf: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => React.ReactNode;
  /** rows rendered beyond the box, above and below */
  overscan?: number;
}

/**
 * A scrolling list that mounts only the items in view. Heights are known
 * (`rowsOf`), so the items above and below the window are plain spacers.
 */
export function VirtualList<T>(props: VirtualListProps<T>) {
  const { items, rowHeight, visibleRows, rowsOf, keyOf, renderItem } = props;
  const overscan = props.overscan ?? 3;

  const [scrollTop, setScrollTop] = React.useState(0);
  const handleScroll = React.useCallback((ev: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(ev.currentTarget.scrollTop);
  }, []);

  // the window: the first item at or before the scrolled row, up to the
  // last item at or after the box's bottom row, both extended by overscan
  const firstRow = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan);
  const lastRow = Math.floor(scrollTop / rowHeight) + visibleRows + overscan;

  let row = 0;
  let start = -1;
  let end = items.length;
  let rowsBefore = 0;
  let rowsAfter = 0;
  for (let i = 0; i < items.length; i++) {
    const rows = rowsOf(items[i], i);
    if (start < 0 && row + rows > firstRow) {
      start = i;
      rowsBefore = row;
    }
    if (start >= 0 && row > lastRow) {
      end = i;
      rowsAfter = totalRows(items, rowsOf) - row;
      break;
    }
    row += rows;
  }
  if (start < 0) start = items.length;

  const boxStyle: React.CSSProperties = {
    height: rowHeight * visibleRows,
    overflowY: "auto",
    overflowX: "hidden",
  };

  return (
    <div style={boxStyle} onScroll={handleScroll}>
      <div style={{ height: rowsBefore * rowHeight }} />
      {items.slice(start, end).map((item, i) => (
        <React.Fragment key={keyOf(item, start + i)}>{renderItem(item, start + i)}</React.Fragment>
      ))}
      <div style={{ height: rowsAfter * rowHeight }} />
    </div>
  );
}

const totalRows = <T,>(items: T[], rowsOf: (item: T, index: number) => number) => {
  let rows = 0;
  for (let i = 0; i < items.length; i++) rows += rowsOf(items[i], i);
  return rows;
};
