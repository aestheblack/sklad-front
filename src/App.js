import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import NotFound from "./pages/notFound";
import Login from "./pages/login";
import Admin from "./pages/admins";
import Dashboard from "./pages/dashboard";
import Category from "./pages/categories";
import Helper from "./pages/helpers";
import Products from "./pages/products";
import Private from "./components/Private";

function App() {
  return (
    <Router>
      <Routes>
        {/* Non-Sidebar Routes */}
        <Route path="/" element={<Login />} />
        <Route path="*" element={<NotFound />} />

        {/* Routes with Sidebar */}
        <Route
          path="/"
          element={<Sidebar />} // Sidebar as a layout
        >
          <Route path="admin" element={<Private element={Admin} />} />
          <Route path="dashboard" element={<Private element={Dashboard} />} />
          <Route path="categories" element={<Private element={Category} />} />
          <Route path="helpers" element={<Private element={Helper} />} />
          <Route path="products" element={<Private element={Products} />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
