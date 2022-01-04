import React from "react";
import { Route, Routes } from "react-router-dom";
import GridProducts from "./pages/GridProducts/GridProducts";
import Login from "./pages/Login/Login";

import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      
      <Routes>
        {/* <Route path="/login" exact render={(routeProps) => <Login {...routeProps} />}/> */}
        <Route path="/signin" exact element={<Login />}/>
        <Route path="/signup" exact element={<Register />}/>
        <Route path="/" exact element={<GridProducts />}/>
      </Routes>
    </div>
  );
}

export default App;
