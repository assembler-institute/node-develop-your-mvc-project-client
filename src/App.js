import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/login" exact render={(routeProps) => <Login {...routeProps} />}/> */}
        <Route path="/login" exact element={<Login />}>
          
        </Route>
      </Routes>
    </div>
  );
}

export default App;
