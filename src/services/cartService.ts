import { ICartItem } from "interfaces/cart";

const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? (JSON.parse(cart) as ICartItem[]) : [];
};
const cartService = {
  getCart,
};

export default cartService;
