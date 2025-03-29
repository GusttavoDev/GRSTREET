"use client";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
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
const deleteCategoriesUseCase = new DeleteCategoriesUseCase();

export default function CategoryList({ categories, subCategories, fetchCategories }: CategoryListProps) {
  const [data, setData] = useState({
    id: "",
    name: "",
    image: "",
    destaqued: true,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    let newValue: any = value;

    if (name === "destaqued") {
      newValue = value === "true";
    }

    setData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleEditCategory = async (categoryId: string) => {
    try {
      await editCategoriesUseCase.execute(data);
      fetchCategories(); // Refresh the categories list after editing
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja apagar esta categoria?");
    if (confirmDelete) {
      try {
        await deleteCategoriesUseCase.execute(categoryId);
        fetchCategories(); // Refresh the categories list after deletion
      } catch (error: unknown) {
        console.log(error);
      }
    }
  };

  const handleAddCategory = async () => {
    try {
      await addCategoriesUseCase.execute(data);
      fetchCategories(); // Refresh the categories list after adding
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.id !== "") {
      handleEditCategory(data.id); // Edit category if id is present
    } else {
      handleAddCategory(); // Add new category if no id
    }
  };

  const categoryFormComponent = () => {
    return (
      <div className="category-popup">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            placeholder={data.name ? data.name : "Nome"}
            required
          />
          <input
            type="text"
            name="image"
            value={data.image}
            onChange={handleChange}
            placeholder={data.image ? data.image : "Imagem"}
            required
          />
          <select
            name="destaqued"
            value={String(data.destaqued)} // Convertendo para string
            onChange={handleChange}
          >
            <option value="true">Sim</option>
            <option value="false">Não</option>
          </select>
          <button type="submit" className="btn-submit">
            {data.id ? "Editar Categoria" : "Adicionar Categoria"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="category-list">
      <button className="btn-new" onClick={() => setData({ id: "", name: "", image: "", destaqued: true })}>
        Nova Categoria
      </button>
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
                <button className="btn" onClick={() => setData(category)}>Editar</button>
                <button className="btn btn-delete" onClick={() => handleDeleteCategory(category.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {categoryFormComponent()}
    </div>
  );
}
