import { memo } from "react";
import classes from "./styles.module.scss";
import { Button, Card, Chip, Rating } from "@mui/material";
import { IProduct } from "interfaces/products";
import { AddToCart, MediaThumbnailPlaceholderImage } from "assets";
import currencyService from "services/currencyService";

interface ProductProps {
  product: IProduct;
}

const Product: React.FC<ProductProps> = memo((props: ProductProps) => {
  const { product } = props;

  return (
    <Card className={classes.productContainer}>
      <div className={classes.imageContainer}>
        <img rel="preload" src={product?.image ?? MediaThumbnailPlaceholderImage} alt={product?.title} />
      </div>
      <Chip
        className={classes.category}
        label={product.category}
        onClick={() => {
          // do nothing
        }}
      />
      <p className={classes.title}>{product?.title ?? "N/A"}</p>
      <p className={classes.description}>{product?.description ?? "N/A"}</p>
      <p className={classes.price}>{product?.price ? currencyService.formatPrice(product?.price) : "N/A"}</p>
      <div className={classes.rating}>
        <Rating value={product?.rating?.rate} readOnly size="small" />
        <span className={classes.count}>{`(${product?.rating?.count})`}</span>
      </div>
      <div className={classes.addToCartButton}>
        <Button variant="contained">
          <AddToCart style={{fill: "var(--white)"}} />
          <span>Add to cart</span>
        </Button>
      </div>
    </Card>
  );
});

export default Product;
