import { memo, useEffect, useMemo, useState } from "react";
import classes from "./styles.module.scss";
import Select from "components/Select";
import { useSelector } from "react-redux";
import { IRootState } from "appRedux/reducers";
import { ArrowDownIcon, ClearIcon, SearchIcon } from "assets";
import clsx from "clsx";
import { Button, IconButton, Menu, Rating, Skeleton, Slider } from "@mui/material";
import currencyService from "services/currencyService";
import { ESortType } from "configs/enums";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { IProductFilters } from "interfaces/products";
import { yupResolver } from "@hookform/resolvers/yup";
import useDebounce from "hooks/useDebounce";
import { useAppDispatch } from "appRedux/hook";
import { getProductsRequest } from "appRedux/reducers/products/actionTypes";
import Input from "components/Input";

export const MOCK_PRICE_RANGE = {
  min: 0,
  max: 1000,
};

interface DataControlProps {}

const DataControl: React.FC<DataControlProps> = memo((props: DataControlProps) => {
  const dispatch = useAppDispatch();

  const categories = useSelector((state: IRootState) => state.categories);
  const products = useSelector((state: IRootState) => state.products);

  const [priceMenuAnchorEl, setPriceMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [ratingMenuAnchorEl, setRatingMenuAnchorEl] = useState<null | HTMLElement>(null);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string(),
      sortBy: Yup.object({
        label: Yup.string(),
        value: Yup.string(),
      }).nullable(),
      categories: Yup.array()
        .of(
          Yup.object({
            label: Yup.string(),
            value: Yup.string(),
          })
        )
        .nullable(),
      prices: Yup.array().of(Yup.number()).length(2),
      rating: Yup.number().default(0),
    });
  }, [categories]);

  const {
    watch,
    setValue,
    getValues,
    register,
    formState: { isDirty },
    control,
  } = useForm<IProductFilters>({
    resolver: yupResolver<Yup.AnyObject>(validationSchema),
    mode: "onChange",
  });

  const watchSortBy = watch("sortBy");
  const watchCategories = watch("categories");
  const watchPrices = watch("prices");
  const watchRating = watch("rating");

  const isFilterPrice = useMemo(
    () => watchPrices && (watchPrices?.[0] !== MOCK_PRICE_RANGE.min || watchPrices?.[1] !== MOCK_PRICE_RANGE.max),
    [watchPrices]
  );
  const isFilterRating = useMemo(() => watchRating && watchRating > 0, [watchRating]);

  const onApplyFilter = useDebounce(() => {
    if (isDirty) {
      dispatch(
        getProductsRequest({
          ...products,
          isSortingOrFiltering: true,
          meta: { ...products.meta, page: 1 },
          sortFilterCriteria: {
            ...products.sortFilterCriteria,
            sortBy: watchSortBy,
            categories: watchCategories,
            prices: watchPrices,
            rating: watchRating,
          },
        })
      );
    }
  }, 300);

  useEffect(() => {
    onApplyFilter();
  }, [watchSortBy, watchCategories, watchPrices, watchRating]);

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

  const onClearPriceFilter = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setValue("prices", [MOCK_PRICE_RANGE.min, MOCK_PRICE_RANGE.max]);
  };

  const onClearRatingFilter = (e: React.MouseEvent<HTMLOrSVGElement>) => {
    e.stopPropagation();
    setValue("rating", 0);
  };

  const onSearchProduct = () => {
    const keyword = getValues("name");
    if (keyword !== products.sortFilterCriteria.name) {
      dispatch(
        getProductsRequest({
          ...products,
          isSortingOrFiltering: true,
          meta: { ...products.meta, page: 1 },
          sortFilterCriteria: {
            ...products.sortFilterCriteria,
            name: keyword,
          },
        })
      );
    }
  };

  return (
    <div className={classes.dataControlContainer}>
      <Select
        control={control}
        name="sortBy"
        label="Sort by:"
        aria-labelledby="sortBy"
        aria-label="sortBy"
        placeholder="Sort by"
        options={[
          { value: ESortType.NAME_ASC, label: "Name A-Z" },
          { value: ESortType.NAME_DESC, label: "Name Z-A" },
          { value: ESortType.RATING_DESC, label: "Rating - High to Low" },
          { value: ESortType.PRICE_DESC, label: "Price - High to Low" },
          { value: ESortType.PRICE_ASC, label: "Price - Low to High" },
        ]}
      />
      {!categories?.isLoading ? (
        <Select
          control={control}
          name="categories"
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
          <ArrowDownIcon />
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
          <ArrowDownIcon />
        </div>
      </Button>

      <div className={classes.searchContainer}>
        <Input placeholder="Search ..." textFieldRef={register("name")} />
        <IconButton className={classes.searchButton} onClick={onSearchProduct}>
          <SearchIcon />
        </IconButton>
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

          <Controller
            name="prices"
            control={control}
            defaultValue={[MOCK_PRICE_RANGE.min, MOCK_PRICE_RANGE.max]}
            render={({ field: { onChange, value } }) => (
              <Slider
                {...props}
                getAriaLabel={() => "Price range"}
                valueLabelDisplay="auto"
                value={value}
                min={MOCK_PRICE_RANGE.min}
                max={MOCK_PRICE_RANGE.max}
                onChange={(_, value) => {
                  onChange(value);
                }}
              />
            )}
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
          <Controller
            name="rating"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Rating
                {...props}
                precision={0.5}
                value={value}
                onChange={(_, value) => {
                  onChange(value);
                }}
              />
            )}
          />

          <p>and up</p>
        </div>
      </Menu>
    </div>
  );
});

export default DataControl;
