import React, { useState, ChangeEvent, FormEvent } from "react";
import IProduct from "@/entities/IProduct";
import ICategory from "@/entities/ICategory";
import ISubCategory from "@/entities/ISubCategory";

import './ProductForm.css'; // Import the CSS file

import SetProductUseCase from "@/connection/Product/UseCases/SetProductUseCase";

const setProductUseCase = new SetProductUseCase();

interface ProductFormProps {
  onClose: () => void;
  categories: ICategory[];
  subCategories: ISubCategory[];
  products: IProduct[];
  fetchProducts: () => Promise<void>;
}

export default function ProductForm({ onClose, categories, subCategories, products, fetchProducts }: ProductFormProps) {
  const [product, setProduct] = useState<IProduct>({
    id: '',
    name: '',
    description: '',
    category: '',
    sub_category: '',
    reviews: [],
    colors: [],
    relatedProducts: [],
    images: [],
  });

  const [imageURLs, setImageURLs] = useState<string[]>([]);
  const [color, setColor] = useState<string>('');
  const [colorPrice, setColorPrice] = useState<number>(0);
  const [colorStock, setColorStock] = useState<number>(0);
  const [colorImageURLs, setColorImageURLs] = useState<string[]>([]);
  const [editingColorIndex, setEditingColorIndex] = useState<number | null>(null);
  const [relatedProductId, setRelatedProductId] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const handleColorPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColorPrice(Number(e.target.value));
  };

  const handleColorStockChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColorStock(Number(e.target.value));
  };

  const handleImageURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split('*').map(url => url.trim()).filter(url => url);
    setImageURLs(urls);
    setProduct(prev => ({
      ...prev,
      images: urls,
    }));
  };

  const handleColorImageURLChange = (e: ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split('*').map(url => url.trim()).filter(url => url);
    setColorImageURLs(urls);
  };

  const handleRemoveImage = (index: number, isColorImage: boolean) => {
    if (isColorImage) {
      setColorImageURLs(prev => prev.filter((_, i) => i !== index));
    } else {
      setImageURLs(prev => prev.filter((_, i) => i !== index));
      setProduct(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
      }));
    }
  };

  const handleAddRelatedProduct = () => {
    if (relatedProductId) {
      setProduct(prev => ({
        ...prev,
        relatedProducts: [...prev.relatedProducts, relatedProductId]
      }));
      setRelatedProductId('');
    }
  };

  const handleRemoveRelatedProduct = (id: string) => {
    setProduct(prev => ({
      ...prev,
      relatedProducts: prev.relatedProducts.filter(productId => productId !== id)
    }));
  };

  const handleAddColor = () => {
    if (color) {
      if (editingColorIndex !== null) {
        setProduct(prev => {
          const updatedColors = [...prev.colors];
          updatedColors[editingColorIndex] = {
            ...updatedColors[editingColorIndex],
            name: color,
            price: colorPrice,
            stock: colorStock,
            images: colorImageURLs
          };
          return { ...prev, colors: updatedColors };
        });
        setEditingColorIndex(null);
      } else {
        setProduct(prev => ({
          ...prev,
          colors: [...prev.colors, { 
            product_id: '', 
            id: '', 
            name: color, 
            price: colorPrice, 
            stock: colorStock, 
            images: colorImageURLs 
          }]
        }));
      }

      setColor('');
      setColorPrice(0);
      setColorStock(0);
      setColorImageURLs([]);
    }
  };

  const handleEditColor = (index: number) => {
    const colorToEdit = product.colors[index];
    setColor(colorToEdit.name);
    setColorPrice(colorToEdit.price);
    setColorStock(colorToEdit.stock);
    setColorImageURLs(colorToEdit.images);
    setEditingColorIndex(index);
  };

  const handleRemoveColor = (index: number) => {
    setProduct(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    await setProductUseCase.execute(product);
    fetchProducts();
    onClose();
  };

  return (
    <div className="form-overlay">
      <div className="form-container">
        <div className="form-content">
          <div className="product-form">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Nome do Produto"
                required
              />
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Descrição"
                required
              />
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
              >
                <option value="">Categoria</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
              <select
                name="sub_category"
                value={product.sub_category}
                onChange={handleChange}
              >
                <option value="">Sub Categoria</option>
                {subCategories.map(sub => (
                  <option key={sub.id} value={sub.name}>{sub.name}</option>
                ))}
              </select>
              <select
                name="relatedProductId"
                value={relatedProductId}
                onChange={(e) => setRelatedProductId(e.target.value)}
              >
                <option value="">Produtos Relacionados</option>
                {products.map(sub => (
                  <option key={sub.id} value={sub.id}>{sub.name}</option>
                ))}
              </select>
              <button type="button" className="btn" onClick={handleAddRelatedProduct}>Adicionar Produto Relacionado</button>
              <ul>
                {product.relatedProducts.map((relatedProduct, index) => (
                  <li key={index}>
                    {products.find(prod => prod.id === relatedProduct)?.name || "Produto não encontrado"}
                    <button type="button" onClick={() => handleRemoveRelatedProduct(relatedProduct)}>Remover</button>
                  </li>
                ))}
              </ul>
              <input
                type="text"
                placeholder="URL'S das Imagens (separadas por * )"
                onChange={handleImageURLChange}
                className="url-input"
              />
              <div className="image-previews">
                {imageURLs.map((url, index) => (
                  <div key={index} className="preview-container">
                    <img src={url} alt={`Preview ${index}`} className="preview-image" />
                    <button type="button" onClick={() => handleRemoveImage(index, false)} className="remove-btn">X</button>
                  </div>
                ))}
              </div>
            </form>
          <div className="form-actions">
            <button type="submit" className="btn" onClick={handleSubmit}>Salvar</button>
            <button type="button" onClick={onClose} className="btn">Cancelar</button>
          </div>
          </div>
          <div className="color-form">
            <input
              type="text"
              value={color}
              onChange={handleColorChange}
              placeholder="Adicionar Cor"
            />
            <input
              type="number"
              value={colorPrice}
              onChange={handleColorPriceChange}
              placeholder="Preço"
            />
            <input
              type="number"
              value={colorStock}
              onChange={handleColorStockChange}
              placeholder="Estoque"
            />
            <input
              type="text"
              placeholder="URL'S das Imagens (separadas por * )"
              onChange={handleColorImageURLChange}
              className="url-input"
            />
            <div className="color-image-previews">
              {colorImageURLs.map((url, index) => (
                <div key={index} className="preview-container">
                  <img src={url} alt={`Color Preview ${index}`} className="preview-image" />
                  <button type="button" onClick={() => handleRemoveImage(index, true)} className="remove-btn">X</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddColor} className="btn">
              {editingColorIndex !== null ? "Editar Cor" : "Adicionar Cor"}
            </button>
            <div className="colors-list">
              {product.colors.map((color, index) => (
                <div key={index}>
                  <p>{color.name}</p>
                  <p>Preço: {color.price.toFixed(2)}</p>
                  <p>Estoque: {color.stock}</p>
                  <div className="color-image-previews">
                    {color.images.map((url, i) => (
                      <div key={i} className="preview-container">
                        <img src={url} alt={`Color Image ${i}`} className="preview-image" />
                      </div>
                    ))}
                  </div>
                  <div className="color-actions">
                      <button type="button" onClick={() => handleEditColor(index)} className="color-edit-btn">Editar</button>
                      <button type="button" onClick={() => handleRemoveColor(index)} className="color-remove-btn">Apagar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
