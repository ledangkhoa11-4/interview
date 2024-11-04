import reducer, {
  addProductToCartReducer,
  changeQuantityProductCartReducer,
  removeProductFromCartReducer,
  setCartReducer,
  ICartState,
} from "appRedux/reducers/cart";
import { ICartItem } from "interfaces/cart";
import { IProduct } from "interfaces/products";

describe("cartSlice", () => {
  const initialState: ICartState = {
    data: [],
  };

  it("should return the initial state", () => {
    expect(reducer({ data: [] }, { type: "" })).toEqual(initialState);
  });

  it("should handle addProductToCartReducer", () => {
    const product: IProduct = {
      id: 1,
      title: "Product 1",
      price: 100,
      description: "Description of Product 1",
      category: "Category 1",
      image: "http://example.com/image1.jpg",
      rating: { rate: 4.5, count: 100 }, // Adjust this according to your IRating structure
    };

    const cartItem: ICartItem = {
      product,
      quantity: 1,
    };

    const stateAfterAdding = reducer(initialState, addProductToCartReducer(cartItem));

    expect(stateAfterAdding.data).toEqual([cartItem]);

    // Adding the same product again to check quantity update
    const stateAfterAddingAgain = reducer(stateAfterAdding, addProductToCartReducer({ ...cartItem, quantity: 2 }));

    expect(stateAfterAddingAgain.data[0].quantity).toBe(3); // Expect updated quantity
  });

  it("should handle changeQuantityProductCartReducer", () => {
    const initialProduct: ICartItem = {
      product: {
        id: 1,
        title: "Product 1",
        price: 100,
        description: "Description of Product 1",
        category: "Category 1",
        image: "http://example.com/image1.jpg",
        rating: { rate: 4.5, count: 100 }, // Adjust this according to your IRating structure
      },
      quantity: 1,
    };

    const stateWithProduct = reducer(initialState, addProductToCartReducer(initialProduct));

    const updatedProduct: ICartItem = {
      product: initialProduct.product,
      quantity: 5,
    };

    const newState = reducer(stateWithProduct, changeQuantityProductCartReducer(updatedProduct));

    expect(newState.data[0].quantity).toBe(5);
  });

  it("should handle removeProductFromCartReducer", () => {
    const product1: ICartItem = {
      product: {
        id: 1,
        title: "Product 1",
        price: 100,
        description: "Description of Product 1",
        category: "Category 1",
        image: "http://example.com/image1.jpg",
        rating: { rate: 4.5, count: 100 },
      },
      quantity: 1,
    };
    const product2: ICartItem = {
      product: {
        id: 2,
        title: "Product 2",
        price: 200,
        description: "Description of Product 2",
        category: "Category 2",
        image: "http://example.com/image2.jpg",
        rating: { rate: 5, count: 200 },
      },
      quantity: 2,
    };

    const stateWithProducts = reducer(initialState, addProductToCartReducer(product1));
    const stateWithMultipleProducts = reducer(stateWithProducts, addProductToCartReducer(product2));

    const newStateAfterRemoval = reducer(stateWithMultipleProducts, removeProductFromCartReducer(1));

    expect(newStateAfterRemoval.data).toEqual([product2]);
  });

  it("should handle setCartReducer", () => {
    const products: ICartItem[] = [
      {
        product: {
          id: 1,
          title: "Product 1",
          price: 100,
          description: "Description of Product 1",
          category: "Category 1",
          image: "http://example.com/image1.jpg",
          rating: { rate: 4.5, count: 100 },
        },
        quantity: 1,
      },
      {
        product: {
          id: 2,
          title: "Product 2",
          price: 200,
          description: "Description of Product 2",
          category: "Category 2",
          image: "http://example.com/image2.jpg",
          rating: { rate: 5, count: 200 },
        },
        quantity: 2,
      },
    ];

    const newState = reducer(initialState, setCartReducer(products));

    expect(newState.data).toEqual(products);
  });
});
