import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./pages/ProductPage";
import GridProducts from "./pages/GridProducts/GridProducts";
import Login from "./pages/Login/Login";

import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signin" exact element={<Login />} />
        <Route path="/signup" exact element={<Register />} />
        <Route path="/" exact element={<GridProducts />} />
        <Route path="/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
