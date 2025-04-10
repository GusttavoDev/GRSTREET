"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreatePurchaseUseCase from "@/connection/Purchases/UseCases/CreatePurchaseUseCase";
import UpdateCartUseCase from "@/connection/User/UseCases/UpdateCartUseCase";
import IPurchase, { type IProductPurchase } from "@/entities/IPurchase";
import "./styles.css";
import NavBar from "@/app/components/navbar/NavBar";
import axios from "axios";
import IProductSend from "@/entities/IProductSend";
import Domain from "@/connection/domain";
import PaymentsCheckoutUseCase from "@/connection/Payments/UseCases/PaymentsCheckoutUseCase";
import type IProduct from "@/entities/IProduct";
import type { IPaymentProduct } from "@/entities/IProduct";

const updateCartUseCase = new UpdateCartUseCase();
const createPurchaseUseCase = new CreatePurchaseUseCase();
const paymentsCheckoutUseCase = new PaymentsCheckoutUseCase();

interface IFrete {
  id: number;
  name: string;
  error: string;
  price: string;
  delivery_time: number;
  company: {
    id: number;
    name: string;
    picture: string;
  };
}
const domain = Domain()


export default function ConfirmPurchase() {
  const router = useRouter();
  const [purchaseData, setPurchaseData] = useState<Omit<IPurchase, "id"> | null>(null);
  const [cart, setCart] = useState<{ items: any[]; total: number } | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fretes, setFretes] = useState<IFrete[]>([]);
  const [selectedFrete, setSelectedFrete] = useState<IFrete | null>(null);

  const calcFrete = async () => {
    try {
      const response = await axios.post(`${domain}pages/api/calc-frete`, {
        products: purchaseData?.products,
        user: {
          postal_code: purchaseData?.cep,
        },
      });
      const fretesResponse = response.data.fretes;
      console.log(fretesResponse)
      if (fretesResponse && Array.isArray(fretesResponse)) {
        // Filtrando fretes indisponíveis
        const availableFretes = fretesResponse.filter(frete => !frete.error);
        setFretes(availableFretes);
      } else {
        console.error("Erro ao calcular o frete, resposta inválida.");
        setFretes([]);
      }
    } catch (error) {
      console.error("Erro ao calcular o frete:", error);
      setFretes([]);
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("purchaseData");
    const cartData = localStorage.getItem("cart");
    const selected = localStorage.getItem("selectedItems");
    const tokenData = localStorage.getItem("token");

    if (data && cartData && selected && tokenData) {
      setPurchaseData(JSON.parse(data));
      setCart(JSON.parse(cartData));
      setSelectedItems(JSON.parse(selected));
      setToken(tokenData);
    } else {
      router.push("/Carrinho"); // Se faltar dados, redireciona para o carrinho
    }
  }, [router]);

  useEffect(() => {
    if (purchaseData?.products && purchaseData?.cep) {
      calcFrete(); // Chama a função de cálculo de frete
    }
  }, [purchaseData]);

  const handleFreteSelection = (frete: IFrete) => {
    // Atualiza a seleção de frete
    setSelectedFrete(frete);
  
    // Atualiza o purchaseData com o id da agência de frete selecionada
    setPurchaseData((prev) => 
      prev ? { ...prev, frete: frete.id.toString() } : null
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPurchaseData((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const convertProductsToPaymentProducts = (products: IProductPurchase[]): IPaymentProduct[] => {
    return products.map((product) => ({
      id: product.product_id,                // ID do produto
      title: product.name,                   // Nome do produto
      description: product.description,      // Descrição do produto
      picture_url: "https://example.com", // URL da imagem, pode ser vazio
      quantity: Number(product.quantity),            // Quantidade do produto
      unit_price: Number(product.price),             // Preço unitário do produto
    }));
  };

  const confirmPurchase = async () => {
    setLoading(true);
    try {
      if (!purchaseData || !cart || !token || !selectedFrete) throw new Error("Dados inválidos.");
  
      // Envia os dados do pagamento para a API do Mercado Pago
      const updatedItems = cart.items.filter(
        (item) => !selectedItems.includes(`${item.product_id}-${item.color}-${item.size}`)
      );

      const paymentResponse = await paymentsCheckoutUseCase.execute(
        token,
        convertProductsToPaymentProducts(purchaseData.products), 
        {
          name: purchaseData.UserName,
          email: purchaseData.email
        },
        updatedItems,
        purchaseData,
      );
      
  
      // Verifica se o pagamento foi bem-sucedido
      if (paymentResponse.init_point) {
        window.location.href = paymentResponse.init_point;
      } else {
        throw new Error("Erro ao obter link de pagamento.");
      }
    } catch (error) {
      console.error("Erro ao confirmar a compra:", error);
      alert("Erro ao processar a compra.");
    }
    setLoading(false);
  };  

  if (!purchaseData || !cart || !token) return <p>Carregando...</p>;

  // Verifica se o valor total é maior que 100
  const isFreteGratis = cart.total > 100;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="confirm-purchase-container">
        <h1>Confirmação de Compra</h1>
        <div className="layout-confirm-purchase">
          <form className="purchase-form">
            <h2>Dados Pessoais</h2>
            <div className="form-group">
              <label>Nome:</label>
              <input type="text" name="UserName" value={purchaseData.UserName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Telefone:</label>
              <input type="text" name="cel_number" value={purchaseData.cel_number} onChange={handleChange} />
            </div>

            <h2>Endereço de Entrega</h2>
            <div className="form-group">
              <label>CEP:</label>
              <input type="text" name="cep" value={purchaseData.cep} onChange={handleChange} />
            </div>
            {/* Outros campos de endereço... */}

            <button className="confirm-button" onClick={confirmPurchase} disabled={loading}>
              {loading ? "Confirmando..." : "Confirmar Compra"}
            </button>
          </form>

          <div className="confirm-purchase-products">
            <h2>Produtos Selecionados</h2>
            <ul className="purchase-products">
              {purchaseData.products.map((item, index) => (
                <li key={index} className="purchase-product">
                  {item.name} - {item.color} - {item.size} - {item.quantity}x - R$ {item.price.toFixed(2)}
                </li>
              ))}
              <p>Total: R$ {cart.total.toFixed(2)}</p>
            </ul>
          </div>

          <div className="frete-section">
          <h2>Escolha o Frete</h2>
          {fretes.length > 0 ? (
            <div className="fretes-list">
              {fretes.map((frete) => (
                <div
              key={frete.id}
              className={`frete-option ${selectedFrete?.id === frete.id ? "selected" : ""}`}
              onClick={() => handleFreteSelection(frete)}
            >
              <img
                className="frete-company-img"
                src={frete.company.picture}
                alt={frete.company.name}
              />
              <div className="frete-details">
                <p><strong>{frete.company.name}</strong></p>
                <p>
                  <strong>{frete.name}</strong> -{" "}
                  R${isFreteGratis || frete.price === "0" ? "Grátis" : Number(frete.price).toFixed(2)} - {frete.delivery_time} dias
                </p>
                {frete.error && <p><strong>Status:</strong> {frete.error}</p>}
              </div>
            </div>

              ))}
            </div>
          ) : (
            <p>Não há fretes disponíveis no momento.</p>
          )}
        </div>
        </div>
      </div>
    </>
  );
}
