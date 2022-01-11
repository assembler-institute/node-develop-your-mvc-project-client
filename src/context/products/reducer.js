import React, { createContext, useContext, useReducer } from "react";
import { fetchCategory, fetchProducts } from "./actions";
import { actionTypes } from "./types";

const initValues = {
  cartItems: [],
  products: [],
  isLoading: false,
  hasError: false,
  totalPrice: 0,
  category: null,
};

const ProductsContext = createContext(initValues);

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS: {
      const data = action.payload;
      return { ...state, products: data.data };
    }
    case actionTypes.SELECT_CATEGORY: {
      return { ...state, category: action.payload };
    }
    case actionTypes.FETCH_CATEGORY: {
      return { ...state, products: action.payload };
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
    selectCategory: (category) =>
      dispatch({ type: actionTypes.SELECT_CATEGORY, payload: category }),
    fetchCategory: (products) =>
      dispatch({ type: actionTypes.FETCH_CATEGORY, payload: products }),
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
