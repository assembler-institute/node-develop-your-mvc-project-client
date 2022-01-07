import React, { createContext, useContext, useReducer } from "react";
import { fetchProducts } from "./actions";
import { actionTypes } from "./types";

const initValues = {
  cartItems: [],
  products: [],
  isLoading: false,
  hasError: false,
  totalPrice: 0,
};

const ProductsContext = createContext(initValues);

function reducer(state, action) {
  //const { products, cartItems } = state;

  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS: {
      const data = action.payload;
      return { ...state, products: data };
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
