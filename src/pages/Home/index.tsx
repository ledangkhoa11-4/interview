import { IRootState } from "appRedux/reducers";
import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./styles.module.scss";
import Select from "components/Select";
import Product from "components/Product";
import { Button, Menu, Rating, Skeleton, Slider } from "@mui/material";
import clsx from "clsx";
import currencyService from "services/currencyService";
import { ArrowDown, ClearIcon } from "assets";
import { AutoSizer, WindowScroller, Grid, GridCellRenderer } from "react-virtualized";
import useWindowDimensions from "hooks/useWindowDimensions";
import { useAppDispatch } from "appRedux/hook";
import { getProductsRequest } from "appRedux/reducers/products/actionTypes";

const SKELETON_COUNT = 3;
const COLUMN_COUNT = 3;

const MOCK_PRICE_RANGE = {
  min: 0,
  max: 1000,
};

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = memo((props: HomePageProps) => {
  const dispatch = useAppDispatch();

  const windowSize = useWindowDimensions();

  const products = useSelector((state: IRootState) => state.products);
  const categories = useSelector((state: IRootState) => state.categories);

  const gridRef = useRef<Grid>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollingObserver = useRef<IntersectionObserver>(null);

  const [priceMenuAnchorEl, setPriceMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [ratingMenuAnchorEl, setRatingMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [prices, setPrices] = useState<[number, number]>([MOCK_PRICE_RANGE.min, MOCK_PRICE_RANGE.max]);
  const [rating, setRating] = useState<number | null>(0);

  const isFilterPrice = useMemo(() => prices[0] !== MOCK_PRICE_RANGE.min || prices[1] !== MOCK_PRICE_RANGE.max, [prices]);
  const isFilterRating = useMemo(() => rating > 0, [rating]);
  const containerWidth = useMemo(() => containerRef?.current?.clientWidth, [containerRef, windowSize]);

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
      const columnCount = Math.max(1, Math.min(COLUMN_COUNT, Math.floor(containerWidth / 400)));
      const productIndex = rowIndex * columnCount + columnIndex;
      return (
        <Fragment key={key}>
          {productIndex >= products.data.length ? null : (
            <div key={key} style={style} ref={products.data.length === productIndex + 1 ? lastPostElementRef : null}>
              <Product product={products.data[productIndex]} />
            </div>
          )}
        </Fragment>
      );
    },
    [products, containerWidth]
  );

  const handleOpenPriceMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPriceMenuAnchorEl(event.currentTarget);
  };

  const handleOpenRatingMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRatingMenuAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setPriceMenuAnchorEl(null);
    setRatingMenuAnchorEl(null);
  };

  const handleChangePrice = (event: Event, newValue: number | number[]) => {
    setPrices(newValue as [number, number]);
  };

  const onClearPriceFilter = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setPrices([MOCK_PRICE_RANGE.min, MOCK_PRICE_RANGE.max]);
  };

  const onClearRatingFilter = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setRating(0);
  };

  return (
    <Fragment>
      <div className={classes.dataControlContainer}>
        <Select
          label="Sort by:"
          aria-labelledby="sortBy"
          aria-label="sortBy"
          placeholder="Sort by"
          options={[
            { value: "1", label: "Name A-Z" },
            { value: "2", label: "Name Z-A" },
            { value: "3", label: "Rating - High to Low" },
            { value: "4", label: "Rating - Low to High" },
            { value: "5", label: "Price - High to Low" },
            { value: "6", label: "Price - Low to High" },
          ]}
        />
        {!categories?.isLoading ? (
          <Select
            placeholder="Category"
            aria-labelledby="filterByCategory"
            aria-label="filterByCategory"
            isMulti
            options={categories?.data?.map((category) => ({ value: category.title, label: category.title }))}
          />
        ) : (
          <Skeleton variant="rectangular" width={117} height={38} style={{ borderRadius: 16 }} />
        )}

        <Button
          className={clsx(classes.menuButton, {
            [classes.active]: !!priceMenuAnchorEl || isFilterPrice,
          })}
          aria-controls={priceMenuAnchorEl ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={priceMenuAnchorEl ? "true" : undefined}
          disableTouchRipple
          onClick={handleOpenPriceMenu}
        >
          <span> {isFilterPrice ? "Price*" : "Price"}</span>
          <div className={classes.action}>
            {isFilterPrice ? <ClearIcon onClick={onClearPriceFilter} /> : null}
            <ArrowDown />
          </div>
        </Button>

        <Button
          className={clsx(classes.menuButton, {
            [classes.active]: !!ratingMenuAnchorEl || isFilterRating,
          })}
          aria-controls={ratingMenuAnchorEl ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={ratingMenuAnchorEl ? "true" : undefined}
          disableTouchRipple
          onClick={handleOpenRatingMenu}
        >
          <span>{isFilterRating ? "Rating*" : "Rating"}</span>
          <div className={classes.action}>
            {isFilterRating ? <ClearIcon onClick={onClearRatingFilter} /> : null}
            <ArrowDown />
          </div>
        </Button>
      </div>

      <div className={classes.productList} ref={containerRef}>
        {!products.isLoading || (products.isLoading && products.data?.length) ? (
          <>
            <WindowScroller>
              {({ height, scrollTop, isScrolling, onChildScroll }) => (
                <AutoSizer disableHeight>
                  {({ width }) => {
                    const columnCount = Math.max(1, Math.min(COLUMN_COUNT, Math.floor(containerWidth / 400)));
                    return (
                      <Grid
                        ref={gridRef}
                        autoHeight
                        height={height}
                        cellRenderer={gridCellRenderer}
                        columnWidth={400}
                        rowHeight={537}
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
            {products.isLoading
              ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                  <Skeleton key={`skeleton-${i}`} variant="rectangular" width={360} height={513} style={{ borderRadius: 8 }} />
                ))
              : null}
          </>
        ) : (
          Array.from({ length: SKELETON_COUNT }, (_, i) => (
            <Skeleton key={`skeleton-${i}`} variant="rectangular" width={360} height={513} style={{ borderRadius: 8 }} />
          ))
        )}
      </div>

      <Menu
        className={classes.menu}
        anchorEl={priceMenuAnchorEl}
        open={!!priceMenuAnchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={classes.priceSliderContainer}>
          <span>{currencyService.formatPrice(MOCK_PRICE_RANGE.min)}</span>
          <Slider
            getAriaLabel={() => "Temperature range"}
            valueLabelDisplay="auto"
            value={prices}
            min={MOCK_PRICE_RANGE.min}
            max={MOCK_PRICE_RANGE.max}
            onChange={handleChangePrice}
          />
          <span>{currencyService.formatPrice(MOCK_PRICE_RANGE.max)}</span>
        </div>
      </Menu>

      <Menu
        className={classes.menu}
        anchorEl={ratingMenuAnchorEl}
        open={!!ratingMenuAnchorEl}
        onClose={handleClose}
        disableScrollLock={true}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <div className={classes.ratingSliderContainer}>
          <Rating
            value={rating}
            onChange={(_, newValue) => {
              setRating(newValue);
            }}
          />
          <p>and up</p>
        </div>
      </Menu>
    </Fragment>
  );
});

export default HomePage;
