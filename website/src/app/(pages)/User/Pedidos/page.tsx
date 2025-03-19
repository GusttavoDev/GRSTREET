'use client'

import React, { useEffect, useState } from "react";
import IProduct from "@/entities/IProduct";
import NavBar from "@/app/components/navbar/NavBar";
import GetUserUseCase from "@/connection/User/UseCases/GetUserUseCase";
import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";
import "./style.css";
import Loading from "@/app/components/loading/Loading";
import { useRouter } from "next/navigation";
import IPurchase from "@/entities/IPurchase";
import ListPurchaseUseCase from "@/connection/Purchases/UseCases/ListPurchaseUseCase";
import axios from "axios";

const listProductsUseCase = new ListProductsUseCase();
const listPurchaseUseCase = new ListPurchaseUseCase();
const getUserUseCase = new GetUserUseCase();

export default function MeusPedidos() {
  const [purchases, setPurchases] = useState<IPurchase[] | undefined>(undefined);
  const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [transportadoras, setTransportadoras] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  useEffect(() => {
    async function fetchPurchases() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return confirm("Erro ao Buscar os Pedidos");

        const user = await getUserUseCase.execute(token);
        if (user) {
          const response = await listPurchaseUseCase.execute(user.header.id);
          setPurchases(response);
        }
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
      setLoading(false);
    }

    async function fetchProducts() {
      try {
        const req = await listProductsUseCase.execute();
        setProducts(req);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    fetchPurchases();
    fetchProducts();
  }, []);

  useEffect(() => {
    async function fetchTransportadoras() {
      if (!purchases) return;

      const transportadoraPromises = purchases.map(async (purchase) => {
        if (!purchase.frete) return null;

        try {
          const response = await axios.post('/pages/api/return-name-service', {
            service_id: Number(purchase.frete)
          });

          return { id: purchase.frete, name: response.data.transportadora };
        } catch (error) {
          console.error("Erro ao buscar transportadora:", error);
          return null;
        }
      });

      const results = await Promise.all(transportadoraPromises);
      const transportadoraMap: { [key: string]: string } = {};
      
      results.forEach(result => {
        if (result) {
          transportadoraMap[result.id] = result.name;
        }
      });

      setTransportadoras(transportadoraMap);
    }

    fetchTransportadoras();
  }, [purchases]);

  const handleViewMore = (productId: string) => {
    router.push(`/Products/${productId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="purchases-container">
        <h1>Meus Pedidos</h1>
        {purchases?.length === 0 ? (
          <p>Você não tem pedidos feitos ainda.</p>
        ) : (
          <div className="purchases-list">
            {purchases?.map((purchase, index) => (
              <div key={index} className="purchase-item">
                <h2>Pedido Nº #{purchase.id}</h2>
                <div className="purchase-details">
                  <p>
                    Status:
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
                        padding: '0.1em 0.3em',
                        borderRadius: '5px',
                        marginLeft: '5px'
                      }}
                    >
                      {purchase.status}
                    </span>
                  </p>
                  <p>Valor total: R${purchase.value}</p>
                  <p>Data: {new Date(purchase.date).toLocaleDateString()}</p>
                  <p>Transportadora: {transportadoras[purchase.frete] || "Carregando..."}</p>
                  <p>Código de Rastreio: {purchase.codigo_postagem}</p>
                </div>
                <div className="purchase-products">
                  {purchase.products.map((item, idx) => {
                    const product = products?.find((p) => p.id === item.product_id);
                    const color = product?.colors?.find(
                      (c) => c.name.toLocaleLowerCase() === item.color.toLocaleLowerCase()
                    );
                    const size = color?.sizes.find(
                      (s) => s.name.toLocaleLowerCase() === item.size.toLocaleLowerCase()
                    );
                    return (
                      <div key={idx} className="purchase-product">
                        <img
                          src={color?.images?.[0] || "https://via.placeholder.com/150"}
                          alt={product?.name || "Produto"}
                          className="purchase-product-image"
                        />
                        <div className="purchase-product-details">
                          <h3>{product?.name || "Produto não encontrado"}</h3>
                          <span>Cor: {color?.name || "Não especificada"}</span>
                          <span>Tamanho: {size?.name}</span>
                          <span>Quantidade: {item.quantity}</span>
                          <span>Preço unitário: R${item.price}</span>
                          <span>Total: R${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="view-more">
                  <button onClick={() => handleViewMore(purchase.id)}>
                    Ver mais detalhes
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
