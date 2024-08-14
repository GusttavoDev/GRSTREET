"use client"
import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";
import ListCategoriesUseCase from "@/connection/Categories/UseCases/ListCategoriesUseCase";
import ListSubCategoriesUseCase from "@/connection/SubCategories/UseCases/ListSubCategoriesUseCase";
import ICategory from "@/entities/ICategory";
import ISubCategory from "@/entities/ISubCategory";
import IProduct from "@/entities/IProduct";

const categoriesUseCase = new ListCategoriesUseCase();
const subCategoriesUseCase = new ListSubCategoriesUseCase();
const listProductsUseCase = new ListProductsUseCase();

export default function  () {
  const [products, setProducts] = useState<IProduct[]>();
  const [categories, setCategories] = useState<ICategory[]>();
  const [subCategories, setSubCategories] = useState<ISubCategory[]>();

  const fetchProducts = async () => {
    const response = await listProductsUseCase.execute();
    setProducts(response);
  }

  const fetchCategories = async () => {
    const response = await categoriesUseCase.execute();
    setCategories(response)
    response.map(cat => fetchSubCategories(cat.id));
  }
  
  const fetchSubCategories = async (category: string) => {
    const response = await subCategoriesUseCase.execute(category);
    setSubCategories(response)
  }
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // fetchSubCategories();
  }, [])

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <h1>Manage Products</h1>
            {products && categories && subCategories && <ProductList products={products} fetchProducts={fetchProducts} categories={categories} subCategories={subCategories} />}
      </div>
    </div>
  );
};