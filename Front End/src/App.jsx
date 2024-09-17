import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShoppingCartPage from "./Pages/Shopping";
import Register from "./Pages/register";
import Login from "./Pages/login";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<ShoppingCartPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
