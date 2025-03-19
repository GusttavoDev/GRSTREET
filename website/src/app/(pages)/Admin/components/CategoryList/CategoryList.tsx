"use client";
import React, { useState } from "react";
import ICategory from "@/entities/ICategory";
import ISubCategory from "@/entities/ISubCategory";
import "./CategoryList.css";
import EditCategoriesUseCase from "@/connection/Categories/UseCases/EditCategoriesUseCase";
import AddCategoriesUseCase from "@/connection/Categories/UseCases/AddCategoriesUseCase";
import DeleteCategoriesUseCase from "@/connection/Categories/UseCases/DeleteCategoriesUseCase";

type CategoryListProps = {
  categories: ICategory[];
  subCategories: ISubCategory[];
  fetchCategories: () => Promise<void>;
};

const addCategoriesUseCase = new AddCategoriesUseCase();
const editCategoriesUseCase = new EditCategoriesUseCase();
const deleteCategoriesUseCase = new DeleteCategoriesUseCase()

export default function CategoryList({ categories, subCategories, fetchCategories }: CategoryListProps) {

  const handleEditCategory = async (categoryId: string) => {
    const newName = prompt("Digite o novo nome da categoria:");
    if (newName && newName.trim()) {
      // Logic to update the category's name
      try {
        await editCategoriesUseCase.execute({id: categoryId, name: newName})
        console.log(`Categoria ${categoryId} editada para: ${newName}`);
        fetchCategories(); // Refresh the categories list after editing
      } catch (error: unknown) {
        console.log(error)
      }
    } else {
      alert("Nome inválido. Tente novamente.");
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja apagar esta categoria?");
    if (confirmDelete) {
      try {
        await deleteCategoriesUseCase.execute(categoryId)
        console.log(`Categoria ${categoryId} deletada.`);
        fetchCategories(); // Refresh the categories list after deletion

      } catch (error: unknown) {
        console.log(error)
      }
    }
  };

  const handleAddCategory = async () => {
    const newName = prompt("Digite o novo nome da categoria:");
    if (newName && newName.trim()) {
      // Logic to update the category's name
      try {
        await addCategoriesUseCase.execute({name: newName})
        console.log(`Nova Categoria ${newName}`);
        fetchCategories(); // Refresh the categories list after editing
      } catch (error: unknown) {
        console.log(error)
      }
    } else {
      alert("Nome inválido. Tente novamente.");
    }
  };

  return (
    <div className="category-list">
      <button className="btn-new" onClick={() => handleAddCategory()}>Nova Categoria</button>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button className="btn" onClick={() => handleEditCategory(category.id)}>Editar</button>
                <button className="btn btn-delete" onClick={() => handleDeleteCategory(category.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
