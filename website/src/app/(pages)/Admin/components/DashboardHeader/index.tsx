import React, { useEffect, useState } from 'react';
import IPurchase from '@/entities/IPurchase';
import Loading from '@/app/components/loading/Loading';
import ListAllPurchaseUseCase from '@/connection/Purchases/UseCases/ListAllPurchaseUseCase';
import UpdatePurchaseStatusUseCase from '@/connection/Purchases/UseCases/UpdatePurchaseUseCase';
import RemovePurchaseUseCase from '@/connection/Purchases/UseCases/RemovePurchaseUseCase';
import './style.css';
import EditFormStatus from './components/edit';
import PurchaseDetailsPopup from './components/PurchaseDetailsPopup';

const listAllPurchasesUseCase = new ListAllPurchaseUseCase();
const updatePurchaseStatusUseCase = new UpdatePurchaseStatusUseCase();
const removePurchaseUseCase = new RemovePurchaseUseCase();

export default function DashboardHeader() {
  const [purchases, setPurchases] = useState<IPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editPurchase, setEditPurchase] = useState<IPurchase | null>(null);

  const [selectedPurchase, setSelectedPurchase] = useState<IPurchase | null>(null);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const purchasesData = await listAllPurchasesUseCase.execute();
        setPurchases(purchasesData);
      } catch (error) {
        console.error('Erro ao carregar compras', error);
      }
      setLoading(false);
    };

    fetchPurchases();
  }, []);

  const handleToggleVisualizada = async (id: string, visualizada: boolean) => {
    try {
      const updatedPurchase = await updatePurchaseStatusUseCase.execute(id, "PREPARANDO", "Ainda Não Disponível", (!visualizada));
      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase.id === id ? { ...purchase, visualizada: !visualizada } : purchase
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar status da compra', error);
    }
  };

  const handleEdit = (purchase: IPurchase) => {
    setEditPurchase(purchase);
    setIsEditing(true);  // Abre o popup
  };

  const handleDeletePurchase = async (id: string) => {
    try {
      await removePurchaseUseCase.execute(id);
      setPurchases((prevPurchases) => prevPurchases.filter((purchase) => purchase.id !== id));
    } catch (error) {
      console.error('Erro ao excluir compra', error);
    }
  };

  const handleSaveEdit = async (updatedPurchase: IPurchase) => {
    try {
      // Atualizar no banco de dados
      await updatePurchaseStatusUseCase.execute(updatedPurchase.id, updatedPurchase.status, updatedPurchase.codigo_postagem, updatedPurchase.visualizada);

      setPurchases((prevPurchases) =>
        prevPurchases.map((purchase) =>
          purchase.id === updatedPurchase.id ? updatedPurchase : purchase
        )
      );
      setIsEditing(false);  // Fecha o popup após salvar
    } catch (error) {
      console.error('Erro ao salvar alterações', error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="dashboard-container">
      <h1>Painel de Administração - Vendas</h1>
      <div className="purchases-list">
        {purchases.map((purchase) => (
          <div key={purchase.id} className="purchase-item">
            <h2>Pedido Nº #{purchase.id}</h2>
            <div className="purchase-details">
            <p>Status:
              <span
                style={{
                  backgroundColor: 
                    purchase.status === 'PREPARANDO' ? 'yellow' :
                    purchase.status === 'ENVIADO' ? 'blue' :
                    purchase.status === 'CONCLUIDO' ? 'green' :
                    purchase.status === 'CANCELADO' ? 'red' : 'transparent',
                  color: 
                    purchase.status === 'PREPARANDO' ? 'black' :
                    purchase.status === 'ENVIADO' ? 'white' :
                    purchase.status === 'CONCLUIDO' ? 'black' :
                    purchase.status === 'CANCELADO' ? 'white' : 'transparent',
                  cursor: 'pointer',
                  padding: '0.1em 0.3em', // Adicionando um pouco de padding para melhorar a aparência
                  borderRadius: '5px', // Opcional: adicionando bordas arredondadas para um visual mais suave
                  marginLeft: '5px'
                }}
                onClick={() => handleEdit(purchase)}
              >
                {purchase.status}
              </span>
              </p>

              <p>Valor total: R${purchase.value}</p>
              <p>Frete: {purchase.frete}</p>
              <p>Código de Rastreio: {purchase.codigo_postagem}</p>
              <p>Data: {new Date(purchase.date).toLocaleDateString()}</p>
            </div>

            <div className="purchase-actions">
              <div className="purchase-visualizada">
                <span
                  style={{
                    backgroundColor: purchase.visualizada ? 'blue' : 'green',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleToggleVisualizada(purchase.id, purchase.visualizada)}
                ></span>
                {purchase.visualizada ? 'Visualizada' : 'Não visualizada'}
              </div>

              <div className="buttons-purchase">
              <button className='delete' onClick={() => handleDeletePurchase(purchase.id)}>Excluir</button>
              <button className='edit' onClick={() => handleEdit(purchase)}>Editar</button>
              <button className="view-more" onClick={() => setSelectedPurchase(purchase)}>Ver mais</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isEditing && editPurchase && (
        <EditFormStatus
        purchase={editPurchase}
        onClose={() => setIsEditing(false)}  // Fechar o popup
        onSave={handleSaveEdit}  // Passa a função de salvar
        />
      )}
      {selectedPurchase && (
        <>
        <PurchaseDetailsPopup
        purchase={selectedPurchase}
        onClose={() => setSelectedPurchase(null)}
        />
        </>
      )}
    </div>
  );
}
