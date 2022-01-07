import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProductsProvider } from "./context/products";

ReactDOM.render(
  <ProductsProvider>
    <React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  </ProductsProvider>,
  document.getElementById("root"),
);
