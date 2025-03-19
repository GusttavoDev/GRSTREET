import React from "react";
import IPurchase from "@/entities/IPurchase";
import "./styles.css"

interface Props {
  purchase: IPurchase;
  onClose: () => void;
}

const PurchaseDetailsPopup: React.FC<Props> = ({ purchase, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Detalhes da Compra</h2>
        <p><strong>Pedido Nº:</strong> {purchase.id}</p>
        <p><strong>Comprador:</strong> {purchase.UserName}</p>
        <p><strong>CPF:</strong> {purchase.cpf || "Não informado"}</p>
        <p><strong>Email:</strong> {purchase.email}</p>
        <p><strong>Endereço:</strong> {purchase.street}, {purchase.number}, {purchase.neighborhood}, {purchase.city} - {purchase.state}</p>
        <p><strong>CEP:</strong> {purchase.cep}</p>
        <p><strong>Valor Total:</strong> R${purchase.value}</p>
        <p><strong>Status do Pagamento:</strong> {purchase.payment_status}</p>
        <p><strong>Método de Pagamento:</strong> {purchase.payment_method}</p>
        <p><strong>Status do Pedido:</strong> {purchase.status}</p>
        <p><strong>Código de Rastreio:</strong> {purchase.codigo_postagem}</p>
        <h3>Produtos Comprados:</h3>
        <ul>
          {purchase.products.map((product) => (
            <li key={product.product_id}>
              <strong>{product.name}</strong> - {product.quantity}x ({product.size}, {product.color}) - R${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PurchaseDetailsPopup;
