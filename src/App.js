import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Admin from "./pages/admins";
import Dashboard from "./pages/dashboard";
import Category from "./pages/categories";
import Helper from "./pages/helpers";
import Products from "./pages/products";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/helpers" element={<Helper />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;
