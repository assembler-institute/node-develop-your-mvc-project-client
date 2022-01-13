import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import GridProducts from "./pages/GridProducts/GridProducts";
import Login from "./pages/Login/Login";

import Register from "./pages/Register";
import { getCurrentUser } from "./context/authContext/localStorage";
import Dashboard from "./pages/Dashboard";
import DashboardProducts from "./pages/DashboardProducts/DashboardProducts";
import DashboardSingleProduct from "./pages/DashboardSingleProduct/DashboardSingleProduct";
import DashboardEmployees from "./pages/DashboardEmployees/DashboardEmployees";
import DashboardSingleEmployee from "./pages/DashboardSingleEmployee/DashboardSingleEmployee";

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
  let role = null;
  let localStorage = loadLocalStorageItems("ShoppingCart", []);
  const { getLocalStorage } = useProducts();
  const { isAuth, signInSuccess } = useAuth();
  const isLogged = checkSession();
  const currentUser = isLogged ? getCurrentUser() : null;
  if (currentUser) role = currentUser.roles[0];

  useEffect(() => {
    getLocalStorage(localStorage);
    if (isLogged) {
      signInSuccess(currentUser);
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/signin" exact element={<Login />} />
        <Route path="/signup" exact element={<Register />} />
        {!role ? <Route path="/" exact element={<GridProducts />} /> : null}
        {role === "Customer" ? (
          <Route path="/" exact element={<GridProducts />} />
        ) : null}
        {role !== "Customer" ? (
          <Route path="/" exact element={<Dashboard />} />
        ) : null}
        <Route path="/:id" element={<ProductPage />} />
        <Route path="/employees" element={<DashboardEmployees />} />
        <Route
          path="/employees/:employeeId"
          element={<DashboardSingleEmployee />}
        />
        <Route path="/dashboard_products" element={<DashboardProducts />} />
        <Route
          path="/dashboard_products/:productId"
          element={<DashboardSingleProduct />}
        />
        <Route path="/shopping-cart-view" element={<ShoppingCart />} />
        <Route path="/completed" element={<CheckoutCompletedPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </div>
  );
}

export default App;
