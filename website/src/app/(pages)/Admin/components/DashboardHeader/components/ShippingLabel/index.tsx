import React, { useState } from "react";
import axios from "axios";
import IPurchase from "@/entities/IPurchase";

import "./style.css"

interface Props {
  purchase: IPurchase;
}

const ShippingLabel: React.FC<Props> = ({ purchase }) => {
  const [loading, setLoading] = useState(false);
  const [trackingCode, setTrackingCode] = useState<string | null>(purchase.codigo_postagem ? "Ainda Não Disponível" : null);

  const handleGenerateLabel = async () => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/pages/api/generate-label", { purchaseId: purchase.id });
      if (response.data.labelUrl) {
        window.open(response.data.labelUrl, "_blank");
        setTrackingCode(response.data.trackingCode);
      }
    } catch (error) {
      console.error("Erro ao gerar etiqueta:", error);
      alert("Erro ao gerar etiqueta");
    } finally {
      setLoading(false);
    }
  };

  const handleGetTrackingCode = async () => {
    try {
      const response = await axios.post("http://localhost:3000/pages/api/get-tracking", { purchaseId: purchase.id });
      setTrackingCode(response.data.trackingCode);
    } catch (error) {
      console.error("Erro ao buscar código de rastreio:", error);
      alert("Erro ao buscar rastreio");
    }
  };

  return (
    <div className="shipping-label">
      {trackingCode === "Ainda Não Disponível" ? (
        <button onClick={handleGenerateLabel} disabled={loading}>
          {loading ? "Gerando..." : "Gerar Etiqueta"}
        </button>
      ) : (
        <>
          <button onClick={() => window.open(`http://localhost:3000/pages/api/print-label?purchaseId=${purchase.id}`, "_blank")}>
            Imprimir Etiqueta
          </button>
          <button onClick={handleGetTrackingCode}>
            Atualizar Código de Rastreio
          </button>
          <p><strong>Código de Rastreio:</strong> {trackingCode}</p>
        </>
      )}
    </div>
  );
};

export default ShippingLabel;
