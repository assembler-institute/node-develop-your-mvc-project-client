import axios from "axios";
import loadLocalStorageItems from "../../hooks/useLoadLocalStorage";
import { saveShoppingCart } from "./localStorage";
import { actionTypes } from "./types";

export async function fetchProducts(dispatch) {
  try {
    const products = await axios.get("http://localhost:4000/products");
    dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: products.data });
  } catch (err) {
    console.log(err);
  }
}

function buildNewCartItem(cartItem) {
  /*   if (cartItem.quantity && cartItem.quantity >= cartItem.unitsInStock) {
    return cartItem;
  } */

  return {
    ...cartItem,
    quantity: 1,
  };
}

export async function addProductShoppingCart(dispatch, id) {
  const shoppingCart = loadLocalStorageItems("ShoppingCart", []);

  try {
    const {
      data: { data },
    } = await axios.get(`http://localhost:4000/products/${id}`);

    const prevCartItem = shoppingCart.find((item) => item._id === id);

    let updatedShoppingCart = [];

    if (prevCartItem) {
      updatedShoppingCart = shoppingCart.map((item) => {
        if (item._id !== id) return item;

        if (item.quantity && item.quantity >= item.unitsInStock) return item;

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      });
    } else {
      const updatedProduct = buildNewCartItem(data);
      if (shoppingCart.length === 0) {
        updatedShoppingCart.push(updatedProduct);
        saveShoppingCart(updatedShoppingCart);
      } else {
        shoppingCart.push(updatedProduct);
        saveShoppingCart(shoppingCart);
      }
    }

    if (prevCartItem) saveShoppingCart(updatedShoppingCart);

    dispatch({ type: actionTypes.ADD_PRODUCT_SHOPPING_CART, payload: updatedShoppingCart });
  } catch (err) {
    console.log(err);
  }
}

export function changeShoppingCart(dispatch, id, quantity, shoppingCart) {
  const updatedShoppingCart = shoppingCart.map((item) => {
    if (
      item._id === id &&
      item.quantity <= item.unitsInStock &&
      quantity >= 1
    ) {
      return {
        ...item,
        quantity: Number(quantity),
      };
    }
    return item;
  });
  saveShoppingCart(updatedShoppingCart);

  dispatch({ type: actionTypes.CHANGE, payload: updatedShoppingCart });
}

export function removeItemShoppingCart(dispatch, id, shoppingCart) {
  const updatedShoppingCart = shoppingCart.filter(
    (item) => item._id !== id,
  );
  saveShoppingCart(updatedShoppingCart);

  dispatch({ type: actionTypes.REMOVE, payload: updatedShoppingCart });
}
