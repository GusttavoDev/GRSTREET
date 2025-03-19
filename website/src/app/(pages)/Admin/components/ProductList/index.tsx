"use client"
import React, { useState } from "react";
import IProduct from "@/entities/IProduct"; // Ajuste o caminho conforme necessário
import ProductModal from "../ProductModal";
import ProductForm from "../ProductForm";
import ICategory from "@/entities/ICategory";
import ISubCategory from "@/entities/ISubCategory";
import IReview from "@/entities/IReview";
import IColor from "@/entities/IColor";

import './ProductList.css'
import DeleteProductByIdUseCase from "@/connection/Product/UseCases/DeleteProductByUseCase";
import Loading from "@/app/components/loading/Loading";

type ProductListProps = {
  categories: ICategory[];
  subCategories: ISubCategory[];
  products: IProduct[];
  fetchProducts: () => Promise<void>;
}

const deleteProductByIdUseCase = new  DeleteProductByIdUseCase();

export default function ProductList({ categories, subCategories, products, fetchProducts }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [selectedEditProduct, setSelectedEditProduct] = useState<IProduct | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const openEditModal = (product: IProduct) => {
    // console.log(product)
    setSelectedEditProduct(product);
    setIsEditFormOpen(true);
  };

  const closeEditModal = () => {
    setIsEditFormOpen(false);
    setSelectedEditProduct(undefined);
  };

  const openForm = () => {
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  const deleteProduct = async (id: string) => {
    setLoading(true)
    try {
      await deleteProductByIdUseCase.execute(id);
      fetchProducts()
    } catch (error : unknown) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    
    <div className="product-list">
      <button onClick={openForm} className="btn-new">Novo Produto</button>
      <table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {products.map((product) => (
      <tr key={product.id}>
        <td data-label="Nome">{product.name}</td>
        <td data-label="Ações">
          <button className="btn" onClick={() => openModal(product)}>
            Visualizar
          </button>
          <button className="btn" onClick={() => openEditModal(product)}>
            Editar
          </button>
          <button className="btn btn-delete" onClick={() => deleteProduct(String(product.id))}>Apagar</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
  
      {isModalOpen && <ProductModal product={selectedProduct} onClose={closeModal} />}
      {isFormOpen && <ProductForm onClose={closeForm} categories={categories} subCategories={subCategories} products={products} fetchProducts={fetchProducts} />}
      {isEditFormOpen && (
        <ProductForm
        onClose={closeEditModal}
        categories={categories}
        subCategories={subCategories}
        products={products}
        fetchProducts={fetchProducts}
        productEdit={selectedEditProduct ? { ...selectedEditProduct, relatedProducts: selectedEditProduct.relatedProducts || [] } : undefined}
        />
      )}
     </div>
     {loading && <Loading/>}
      </>
  );
  
}
