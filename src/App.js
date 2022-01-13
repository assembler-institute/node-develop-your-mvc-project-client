import React from "react";
import { Route, Routes } from "react-router-dom";
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

function App() {
  let role = null;
  const currentUser = getCurrentUser();
  if (currentUser) role = currentUser.roles[0];

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
      </Routes>
    </div>
  );
}

export default App;
