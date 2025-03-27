'use client'
import React, { useEffect, useState } from "react";
import IProduct from "@/entities/IProduct";
import IPurchase from "@/entities/IPurchase";
import NavBar from "@/app/components/navbar/NavBar";
import GetUserUseCase from "@/connection/User/UseCases/GetUserUseCase";
import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";
import UpdateCartUseCase from "@/connection/User/UseCases/UpdateCartUseCase";
import CreatePurchaseUseCase from "@/connection/Purchases/UseCases/CreatePurchaseUseCase";
import Loading from "@/app/components/loading/Loading";
import { useRouter } from "next/navigation";
import "./style.css";
import IUser from "@/entities/IUser";
import ConfirmPurchase from "../ConfirmPurchase/page";

const listProductsUseCase = new ListProductsUseCase();
const getUserUseCase = new GetUserUseCase();
const updateCartUseCase = new UpdateCartUseCase();
const createPurchaseUseCase = new CreatePurchaseUseCase();

export default function Carrinho() {
  const [cart, setCart] = useState<{ items: any[]; total: number }>({
    items: [],
    total: 0,
  });
  const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [user, setUser] = useState<IUser>();
  const router = useRouter();

  useEffect(() => {
    async function fetchCartData() {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await getUserUseCase.execute(token);
          if (response) {
            setUser(response);
            setCart(response.cart);
            localStorage.setItem("cart", JSON.stringify(response.cart));
          }
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
      } finally {
        const cartData = localStorage.getItem("cart");
        if (cartData) {
          setCart(JSON.parse(cartData));
        }
        setLoading(false);
      }
    }

    async function fetchProducts() {
      try {
        const req = await listProductsUseCase.execute();
        setProducts(req);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    }

    fetchCartData();
    fetchProducts();
  }, []);

  const handleRemoveItem = async (productId: string, colorName: string, sizeName: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const updatedItems = cart.items.filter(
        (item) => !(item.product_id === productId && item.color === colorName && item.size === sizeName)
      );

      await updateCartUseCase.execute(token, updatedItems);

      const newTotal = updatedItems.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);

      setCart({ items: updatedItems, total: newTotal });
      localStorage.setItem("cart", JSON.stringify({ items: updatedItems, total: newTotal }));
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  const toggleSelectItem = (productId: string, colorName: string, sizeName: string) => {
    const itemKey = `${productId}-${colorName}-${sizeName}`;
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemKey) ? prevSelectedItems.filter((item) => item !== itemKey) : [...prevSelectedItems, itemKey]
    );
  };

  const handleCreatePurchase = async () => {
    const token = localStorage.getItem("token");
    if (selectedItems.length === 0) {
      alert("Selecione pelo menos um produto.");
      return;
    }
    if (!token) {
      alert("Faça Login Primeiro!");
      return;
    }

    try {
      if (!user?.header.id) {
        alert("Usuário não encontrado.");
        return;
      }

      const selectedProducts = cart.items.filter((item) =>
        selectedItems.includes(`${item.product_id}-${item.color}-${item.size}`)
      );

      const detailedProducts = selectedProducts.map((item) => {
        const product = products?.find((prod) => prod.id === item.product_id);
        if (!product) {
          throw new Error(`Produto com ID ${item.product_id} não encontrado.`);
        }
      
        const colorDetails = product.colors?.find((c) => c.name.toLowerCase() === item.color.toLowerCase());
        const sizeDatails = colorDetails?.sizes.find((s) => s.name.toLocaleLowerCase() === item.size.toLowerCase()); // Ajustado para usar `item.size`
        const price = colorDetails?.price || 0;
        const stock = sizeDatails?.quantity || 0;
      
        return {
          purchase_id: "tempPurchaseId", // Aqui você deve definir o ID da compra temporário
          product_id: item.product_id,   // Adiciona o ID do produto
          name: product.name || "Nome não disponível",
          description: product.description || "Descrição não disponível",
          price,
          stock,
          category: product.category || "Categoria não Disponível",
          sub_category: product.sub_category || "Subcategoria não disponível",
          color: item.color,
          quantity: item.quantity,
          size: item.size,  // Certifique-se de incluir o campo size aqui
          weight: product.weight || '0',  // Adicione a propriedade `weight`
          height: product.height || '0',  // Adicione a propriedade `height`
          width: product.width || '0',    // Adicione a propriedade `width`
          length: product.length || '0',  // Adicione a propriedade `length`
        };
      });
      
    

      const purchaseData: Omit<IPurchase, "id"> = {
        user_id: user.header.id,
        products: detailedProducts,
        cel_number: user.personal_data.cel_number,
        cep: user.addres.cep,
        country: user.addres.country,
        state: user.addres.state,
        city: user.addres.city,
        neighborhood: user.addres.neighborhood,
        street: user.addres.street,
        number: user.addres.number,
        cpf: user.personal_data.cpf || null,
        email: user.header.email,
        UserName: user.personal_data.name,
        payment_method: "cartao",
        payment_status: "PENDENTE",
        payment_id: "paymentIdPlaceholder",
        value: String(detailedProducts.reduce((acc, item) => acc + item.price * item.quantity, 0)),
        codigo_postagem: "Ainda Não Disponível",
        date: new Date(),
        status: "PREPARANDO",
        vendedor: "vendedorPlaceholder",
        frete: "fretePlaceholder",
        visualizada: false,
      };
      
    // 🔹 Salvar os dados no localStorage para recuperar na outra página
    localStorage.setItem("purchaseData", JSON.stringify(purchaseData));
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    localStorage.setItem("token", token);

      // Redirecionar para a página de confirmação com o ID do usuário
      router.push(`/User/ConfirmPurchase`);
    } catch (error) {
      console.error("Erro ao criar a compra:", error);
      alert("Erro ao processar a compra.");
    }
  };

  if (loading) return <Loading />;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <div className="cart-container">
        <h1>Meu Carrinho</h1>
        {cart.items.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <div className="cart-items">
            {cart.items.map((item, index) => {
              const product = products?.find((p) => p.id === item.product_id);
              const color = product?.colors?.find((c) => c.name.toLowerCase() === item.color.toLowerCase());
              const size = color?.sizes.find((s) => s.name.toLowerCase() === item.size.toLowerCase());
              return (
                <div key={index} className="cart-item">
                  <input className="checkbox" type="checkbox" checked={selectedItems.includes(`${item.product_id}-${item.color}-${item.size}`)} onChange={() => toggleSelectItem(item.product_id, item.color, item.size)} />
                  <img src={color?.images?.[0] || "https://via.placeholder.com/150"} alt={product?.name || "Produto"} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h2>{product?.name || "Produto não encontrado"}</h2>
                    <span>Cor: {color?.name || "Não especificada"}</span>
                    <span>Tamanho: {size?.name || "Não especificado"}</span>
                    <span>Quantidade: {item.quantity}</span>
                    <span>R$ {(item.quantity * (color?.price || 0)).toFixed(2)}</span>
                    <div className="cart-buttons">
                    <button className="remove-button" onClick={() => handleRemoveItem(item.product_id, item.color, item.size)}>Remover</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {cart.items.length > 0 && <button onClick={handleCreatePurchase} className="checkout-button">Finalizar Compra</button>}
      </div>
    </>
  );
}
