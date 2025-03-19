import IPurchase from "@/entities/IPurchase";
import { useState } from "react";
import "./style.css"
import ShippingLabel from "../ShippingLabel";

interface EditFormStatusProps {
  purchase: IPurchase;
  onClose: () => void;
  onSave: (purchase: IPurchase) => void;
}

export default function EditFormStatus({ purchase, onClose, onSave }: EditFormStatusProps) {
  const [status, setStatus] = useState<"PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO">(purchase.status);
  const [codigoPostagem, setCodigoPostagem] = useState(purchase.codigo_postagem);

  const handleSave = () => {
    const updatedPurchase: IPurchase = {
      ...purchase,
      status,
      codigo_postagem: codigoPostagem,
    };
    onSave(updatedPurchase);
  };

  return (
    <div className="edit-popup">
      <div className="popup-content">
        <h2>Editar Pedido Nº #{purchase.id}</h2>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as "PREPARANDO" | "ENVIADO" | "CONCLUIDO" | "CANCELADO")}
          >
            <option value="PREPARANDO">Preparando</option>
            <option value="ENVIADO">Enviado</option>
            <option value="CONCLUIDO">Concluído</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </label>

        <label>
          Código de Rastreio:
          <input
            type="text"
            value={codigoPostagem}
            onChange={(e) => setCodigoPostagem(e.target.value)}
          />
        </label>

        <div className="popup-actions">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Fechar</button>
        </div>
      <ShippingLabel purchase={purchase} />
      </div>
      
    </div>
  );
}
