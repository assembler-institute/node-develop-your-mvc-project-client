import React, { createContext, useContext, useReducer } from "react";
import {
  fetchProducts,
  addProductShoppingCart,
  changeShoppingCart,
  removeItemShoppingCart,
} from "./actions";
import { actionTypes } from "./types";

const initValues = {
  products: [],
  shoppingCart: [],
  isLoading: false,
  hasError: false,
  totalPrice: 0,
  orderCompleted: false,
};

const ProductsContext = createContext(initValues);

function reducer(state, action) {
  //const { products, cartItems } = state;

  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS: {
      const data = action.payload;
      return { ...state, products: data.data };
    }
    case actionTypes.ADD_PRODUCT_SHOPPING_CART: {
      const data = action.payload;
      console.log(data);
      return { ...state, shoppingCart: [...data] };
    }
    case actionTypes.GET_LOCAL_STORAGE: {
      const products = action.payload;
      return { ...state, shoppingCart: [...products] };
    }
    case actionTypes.CHANGE: {
      const products = action.payload;
      return { ...state, shoppingCart: [...products] };
    }
    case actionTypes.REMOVE: {
      const products = action.payload;
      return { ...state, shoppingCart: [...products] };
    }
    case actionTypes.ORDER_COMPLETED: {
      return { ...state, orderCompleted: true };
    }
    case actionTypes.RESET_ORDER: {
      return { ...state, shoppingCart: [], orderCompleted: false };
    }
    default: {
      return state;
    }
  }
}

function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initValues);

  const value = {
    ...state,
    fetchAllProducts: () => fetchProducts(dispatch),
    addProductShoppingCart: (id) => addProductShoppingCart(dispatch, id),
    getLocalStorage: (products) =>
      dispatch({ type: actionTypes.GET_LOCAL_STORAGE, payload: products }),
    changeShoppingCart: (id, quantity) =>
      changeShoppingCart(dispatch, id, quantity, state.shoppingCart),
    removeItemShoppingCart: (id) =>
      removeItemShoppingCart(dispatch, id, state.shoppingCart),
    orderFinished: () => dispatch({ type: actionTypes.ORDER_COMPLETED }),
    resetOrder: () => dispatch({ type: actionTypes.RESET_ORDER }),
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) return null;
  return context;
}

export { ProductsProvider, useProducts };
