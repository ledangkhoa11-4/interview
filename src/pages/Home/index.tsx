import { IRootState } from "appRedux/reducers";
import { Fragment, memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./styles.module.scss";
import Select from "components/Select";
import Product from "components/Product";
import { Button, Menu, Rating, Skeleton, Slider } from "@mui/material";
import clsx from "clsx";
import currencyService from "services/currencyService";

const SKELETON_COUNT = 5;

const MOCK_PRICE_RANGE = {
  min: 0,
  max: 1000,
};

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = memo((props: HomePageProps) => {
  const products = useSelector((state: IRootState) => state.products);

  const categories = useSelector((state: IRootState) => state.categories);

  const [priceMenuAnchorEl, setPriceMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [ratingMenuAnchorEl, setRatingMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [prices, setPrices] = useState<[number, number]>([MOCK_PRICE_RANGE.min, MOCK_PRICE_RANGE.max]);

  const [rating, setRating] = useState<number | null>(0);

  const isFilterPrice = useMemo(() => prices[0] !== MOCK_PRICE_RANGE.min || prices[1] !== MOCK_PRICE_RANGE.max, [prices]);

  const isFilterRating = useMemo(() => rating > 0, [rating]);

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

  return (
    <Fragment>
      <div className={classes.dataControlContainer}>
        <Select
          label="Sort by:"
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
          <Select placeholder="Category" isMulti options={categories?.data?.map((category) => ({ value: category.title, label: category.title }))} />
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
          {isFilterPrice ? "Price *" : "Price"}
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
          {isFilterRating ? "Rating *" : "Rating"}
        </Button>
      </div>

      <div className={classes.productList}>
        {!products?.isLoading
          ? products?.data?.map((product) => <Product key={product.id} product={product} />)
          : Array.from({ length: SKELETON_COUNT }, (_, i) => (
              <Skeleton key={`skeleton-${i}`} variant="rectangular" width={360} height={537} style={{ borderRadius: 8 }} />
            ))}
      </div>

      <Menu
        className={classes.menu}
        anchorEl={priceMenuAnchorEl}
        open={!!priceMenuAnchorEl}
        onClose={handleClose}
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
