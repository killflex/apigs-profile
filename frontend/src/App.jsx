import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import EditProduct from "./pages/EditProduct";
import DeleteProduct from "./pages/DeleteProduct";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/product/edit/:id" element={<EditProduct />} />
      <Route path="/product/delete/:id" element={<DeleteProduct />} />
    </Routes>
  );
};

export default App;
