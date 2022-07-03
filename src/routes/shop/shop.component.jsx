import React from "react";
import "./shop.styles.scss";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import { Routes, Route } from "react-router-dom";
import Category from "../category/category.component";
import { CategoriesProvider } from "../../components/contexts/categories.context";

const Shop = () => {
  return (

    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=':category' element={<Category />} />

    </Routes>

  );
};

export default Shop;
