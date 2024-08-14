import React from "react";
import IProduct from "@/entities/IProduct"; // Ajuste o caminho conforme necessário
import IColor from "@/entities/IColor"; // Ajuste o caminho conforme necessário

// Defina a interface para as props
interface ProductModalProps {
  product: IProduct | null; // Produto pode ser null se não houver produto
  onClose: () => void;     // Função que não recebe argumentos e não retorna nada
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  if (!product) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className="product-images">
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={product.name} />
          ))}
        </div>
        <div className="product-colors">
          {product.colors.map((color) => (
            <div key={color.id} className="color-item">
              <span>{color.name}</span>
              <span>${color.price}</span>
              <img src={color.images[0]} alt={color.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
