"use client"
import React, { useState } from "react";
import IProduct from "@/entities/IProduct"; // Ajuste o caminho conforme necessário
import ProductModal from "../ProductModal";
import ProductForm from "../ProductForm";
import ICategory from "@/entities/ICategory";
import ISubCategory from "@/entities/ISubCategory";

type ProductListProps = {
  categories: ICategory[];
  subCategories: ISubCategory[];
  products: IProduct[];
  fetchProducts: () => Promise<void>;
}

export default function ProductList({ categories, subCategories, products, fetchProducts }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="product-list">
      <button onClick={openForm} className="btn">Novo</button>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>{product.name}</span>
            <button onClick={() => openModal(product)} className="btn">Visualizar</button>
            <button className="btn">Editar</button>
            <button className="btn">Apagar</button>
          </li>
        ))}
      </ul>

      {isModalOpen && <ProductModal product={selectedProduct} onClose={closeModal} />}
      {isFormOpen && <ProductForm onClose={closeForm} categories={categories} subCategories={subCategories} products={products} fetchProducts={fetchProducts} />}
    </div>
  );
}
