import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import GridProducts from "./pages/GridProducts/GridProducts";
import Login from "./pages/Login/Login";

import Register from "./pages/Register";
import loadLocalStorageItems from "./hooks/useLoadLocalStorage";
import { useProducts } from "./context/products";
import { useEffect } from "react/cjs/react.development";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import CheckoutCompletedPage from "./pages/CheckoutCompletedPage";
import {
  checkSession,
  getCurrentUser,
} from "./context/authContext/localStorage";
import { useAuth } from "./context/authContext";

function App() {
  let localStorage = loadLocalStorageItems("ShoppingCart", []);
  const { getLocalStorage } = useProducts();
  const { isAuth, signInSuccess } = useAuth();
  const isLogged = checkSession();
  const currentUser = isLogged ? getCurrentUser() : null;

  useEffect(() => {
    getLocalStorage(localStorage);
    if (isLogged) {
      signInSuccess(currentUser);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/login" exact render={(routeProps) => <Login {...routeProps} />}/> */}
        <Route path="/signin" exact element={<Login />} />
        <Route path="/signup" exact element={<Register />} />
        <Route path="/" exact element={<GridProducts />} />
        <Route path="/:id" element={<ProductPage />} />
        <Route path="/shopping-cart-view" element={<ShoppingCart />} />
        <Route path="/completed" element={<CheckoutCompletedPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
