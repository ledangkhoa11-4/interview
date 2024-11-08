import { IRootState } from "appRedux/reducers";
import { Fragment, memo, useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./styles.module.scss";
import Product from "components/Product";
import { Skeleton } from "@mui/material";
import { AutoSizer, WindowScroller, Grid, GridCellRenderer } from "react-virtualized";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useAppDispatch } from "appRedux/hook";
import { getProductsRequest } from "appRedux/reducers/products/actionTypes";
import DataControl from "components/DataControl";
import { NoProductFound } from "assets";

const SKELETON_COUNT = 6;
const COLUMN_COUNT = 3;
const ITEM_WIDTH = 384;

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = memo((props: HomePageProps) => {
  const dispatch = useAppDispatch();

  const windowSize = useWindowDimensions();

  const products = useSelector((state: IRootState) => state.products);

  const gridRef = useRef<Grid>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingObserver = useRef<IntersectionObserver>(null);

  const containerWidth = useMemo(() => containerRef?.current?.clientWidth ?? 0, [containerRef, windowSize]);

  useEffect(() => {
    gridRef.current?.recomputeGridSize();
  }, [windowSize]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (products?.isLoading || !products?.meta?.hasMore) return; // Stop observing if loading or no more posts
      if (scrollingObserver.current) scrollingObserver.current.disconnect();
      scrollingObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          dispatch(getProductsRequest({ ...products, meta: { ...products.meta, page: products.meta.page + 1 } }));
        }
      });

      if (node) scrollingObserver.current.observe(node);
    },
    [products, scrollingObserver]
  );

  const gridCellRenderer: GridCellRenderer = useCallback(
    ({ columnIndex, key, rowIndex, style }) => {
      const columnCount = Math.max(1, Math.min(COLUMN_COUNT, Math.floor(containerWidth / ITEM_WIDTH)));
      const productIndex = rowIndex * columnCount + columnIndex;

      if (productIndex >= products.data.length) return null;
      return (
        <div key={key} style={style} ref={products.data.length === productIndex + 1 ? lastPostElementRef : null}>
          <Product product={products.data[productIndex]} />
        </div>
      );
    },
    [products, containerWidth]
  );

  return (
    <Fragment>
      <DataControl />

      <div className={classes.productList} ref={containerRef}>
        {!products.isLoading || (products.isLoading && products.data?.length) ? (
          <Fragment>
            {products.data?.length > 0 ? (
              <div style={{ width: "100%" }}>
                <WindowScroller>
                  {({ height, scrollTop, isScrolling, onChildScroll }) => (
                    <AutoSizer disableHeight>
                      {({ width }) => {
                        const columnCount = Math.max(1, Math.min(COLUMN_COUNT, Math.floor(containerWidth / ITEM_WIDTH)));
                        return (
                          <Grid
                            ref={gridRef}
                            autoHeight
                            height={height}
                            cellRenderer={gridCellRenderer}
                            columnWidth={Math.min(ITEM_WIDTH, containerWidth)}
                            rowHeight={containerWidth <= 705 ? 460 : 537}
                            enableFixedColumnScroll
                            enableFixedRowScroll
                            scrollTop={scrollTop}
                            columnCount={columnCount}
                            rowCount={Math.ceil(products?.data?.length / columnCount)}
                            width={width}
                            overscanRowCount={0}
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        );
                      }}
                    </AutoSizer>
                  )}
                </WindowScroller>
              </div>
            ) : (
              <>{products.data ? <img rel="preload" src={NoProductFound} style={{ margin: "0 auto" }} alt="No product found" /> : null}</>
            )}

            {products.isLoading
              ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                  <Skeleton key={`skeleton-${i}`} variant="rectangular" width={360} height={513} style={{ borderRadius: 8 }} />
                ))
              : null}
          </Fragment>
        ) : (
          Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <Skeleton key={`skeleton-${i}`} variant="rectangular" width={360} height={513} style={{ borderRadius: 8 }} />
          ))
        )}
      </div>
    </Fragment>
  );
});

export default HomePage;
