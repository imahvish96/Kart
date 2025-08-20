import { Routes, Route } from "react-router-dom";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import NotFound from "../pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Product />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
