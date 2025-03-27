"use client";
import { useEffect, useState } from "react";
import IProduct from "@/entities/IProduct";
import GetProductByIdUseCase from "@/connection/Product/UseCases/GetProductByUseCase";
import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";
import "./style.css";
import NavBar from "@/app/components/navbar/NavBar";
import Loading from "@/app/components/loading/Loading";
import { Cart, CartItem } from "@/entities/IUser";

import UpdatCartUseCase from "@/connection/User/UseCases/UpdateCartUseCase";
import { ISize } from "@/entities/IColor";
const getProductByIdUseCase = new GetProductByIdUseCase();
const listProductsUseCase = new ListProductsUseCase();
const updateCartUseCase = new UpdatCartUseCase();

export default function Product({ params }: { params: { id: number } }) {
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ comment: '', stars: 0 });
    const [cep, setCep] = useState<string>('');  // Estado para armazenar o CEP
    const [calculatedShipping, setCalculatedShipping] = useState<number | null>(null);  // Estado para o frete calculado    
    const [estimatedTime, setEstimatedTime] = useState<string>(''); // Estado para tempo estimado de entrega
    const [popupVisible, setPopupVisible] = useState(false);  // Estado para o popup
    const [stock, setStock] = useState<number>(0);  // Estado para o estoque


    useEffect(() => {
        async function fetchProduct(): Promise<void> {
            try {
                const req = await getProductByIdUseCase.execute(String(params.id));
                if (req && req.images && req.images.length > 0) {
                    setProduct(req);
                    setSelectedImage(req.images[0]);
                    setSelectedColor(0);  // Seleciona a primeira cor por padrão
                    if (req.colors && req.colors.length > 0 && req.colors[0].sizes && req.colors[0].sizes.length > 0) {
                        setSelectedSize(req.colors[0].sizes[0].name);  // Apenas o nome do tamanho
                        setStock(req.colors[0].sizes[0].quantity)
                    } else {
                        console.error("Erro ao acessar tamanhos ou cores:", req);
                        // Trate o erro ou forneça um valor padrão
                    }
                    

                } else {
                    console.error("Produto não encontrado ou dados incompletos.");
                }
            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
            } finally {
                setLoading(false)
            }
        }

        fetchProduct();
    }, [params.id]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const req = await listProductsUseCase.execute();
                setProducts(req);
            } catch (error) {
                console.error('Erro ao buscar os produtos:', error);
            } finally {
                setLoading(false);
            }
        }
    
        fetchProducts();
    }, [params]);

    const calculateShippingCost = async () => {
        if (!cep) {
            alert("Por favor, insira um CEP.");
            return;
        }
    
        try {
            // Simulação de requisição para cálculo de frete e distância
            const distanceResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const referenceResponse = await fetch(`https://viacep.com.br/ws/24890000/json/`);  // CEP de referência
    
            if (!distanceResponse.ok || !referenceResponse.ok) {
                throw new Error("Erro ao obter informações de CEP.");
            }
    
            const userAddress = await distanceResponse.json();
            const referenceAddress = await referenceResponse.json();
    
            if (!userAddress.localidade || !referenceAddress.localidade) {
                throw new Error("Informações de endereço inválidas.");
            }
    
            // Se o CEP for igual ao CEP de referência (24890000), frete grátis e prazo de até 3 dias
            if (cep === "24890000") {
                setCalculatedShipping(0);  // Frete grátis
                setEstimatedTime("Até 3 dias");  // Prazo mínimo de 3 dias
                return;
            }
    
            // Simulação de cálculo da distância (aqui é só um exemplo, seria necessário fazer a geolocalização real)
            const distance = Math.abs(userAddress.ibge - referenceAddress.ibge);  // Simulando distância com base no código IBGE
    
            // Simulando o cálculo do frete
            const shippingCost = 1 + distance * 0.003;  // Preço base + 0.003 por km
            setCalculatedShipping(Math.ceil(shippingCost));  // Arredondando o valor do frete para cima
    
            // Cálculo do tempo de entrega (simulando uma média de 60 km/h)
            const estimatedTimeInHours = (distance / 60);  // Tempo em horas
            let estimatedDays = Math.ceil(estimatedTimeInHours / 24);  // Arredonda para o próximo dia
    
            // Garantir que o prazo mínimo seja 3 dias
            if (estimatedDays < 3) {
                estimatedDays = 3;
            }
    
            setEstimatedTime(`${estimatedDays} dias`);
    
        } catch (error) {
            console.error("Erro ao calcular o frete:", error);
            alert("Erro ao calcular o frete. Tente novamente.");
        }
    };
    

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleColorChange = (index: number) => {
        if (product && product.colors[index]) {
            setSelectedColor(index);
            const newImages = product.colors[index].images || [];
            if (newImages.length > 0) {
                setSelectedImage(newImages[0]); // Atualiza a imagem principal
            }
            setSelectedSize(product.colors[index].sizes[0]?.name || ''); // Acessa o nome do tamanho, ou uma string vazia
        }
    };
    
    const handleSizeChange = (size: ISize) => {
        setSelectedSize(size.name); // Atualiza o tamanho selecionado com o nome do tamanho
        setQuantity(1); // Reseta a quantidade para 1 sempre que o tamanho for alterado
    
        // Atualiza o estoque de acordo com o tamanho selecionado
        const selectedColorData = product?.colors[selectedColor];
        const selectedSizeData = selectedColorData?.sizes.find(s => s.name === size.name);
        setStock(selectedSizeData?.quantity || 0); // Atualiza o estoque do tamanho selecionado
    };
    
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };
    
    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 0 ? prev - 1 : 1)); // Quantidade mínima de 1
    };
    
    
    
    const handleStarClick = (star: number) => {
        setNewReview((prev) => ({ ...prev, stars: star }));
    };

    const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewReview((prev) => ({ ...prev, comment: e.target.value }));
    };

    const submitReview = () => {
        console.log("Nova Avaliação:", newReview);
    };

    const handleShippingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCep(e.target.value);  // Atualiza o estado com o valor do CEP
    };
    
    const handleCalculateShipping = () => {
        calculateShippingCost();  // Chama a função para calcular o frete
    };

    const handleAddCart = async () => {
        const token = localStorage.getItem("token");
        if(quantity == 0) return alert("Adcione pelomenos 1")
        if (!product) return;
        if (!token) {
            alert("Faça Login Primeiro!");
            return;
          }      
          // Obtenha o carrinho do localStorage
          const cartData = localStorage.getItem("cart");
          let cart: Cart = cartData ? JSON.parse(cartData) : { items: [], total: 0 };
          
          const selectedColorData = product.colors[selectedColor];
          const selectedSizeData = product.colors[selectedColor].sizes.find((s) => s.name === selectedSize);
          const newItem: CartItem = {
              product_id: product.id!,
              quantity,
              price: selectedColorData.price,
              color: selectedColorData.name,
              size: selectedSizeData!.name,
            };    
        try {
            setLoading(true)
    
        // Verifique se o item já existe no carrinho
        const existingItemIndex = cart.items.findIndex(
            (item) => item.product_id === newItem.product_id && item.color === newItem.color && item.size === newItem.size
        );
    
        if (existingItemIndex !== -1) {
            // Se já existir, apenas aumente a quantidade
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Caso contrário, adicione um novo item ao carrinho
            cart.items.push(newItem);
        }
    
        // Atualize o total do carrinho
        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    
        // Atualize o carrinho no banco de dados
            const token = localStorage.getItem("token");  // Pegue o token de autenticação
            if (token) {
                await updateCartUseCase.execute(token, cart.items);  // Use o caso de uso para atualizar o carrinho no banco
            }
        } catch (error) {
            console.error("Erro ao atualizar o carrinho no banco de dados:", error);
        } finally {
            // Salve o carrinho atualizado no localStorage
            localStorage.setItem("cart", JSON.stringify(cart));
        
            // Exibe o popup de sucesso
            setPopupVisible(true);
        
            // Fecha o popup após 3 segundos
            setTimeout(() => setPopupVisible(false), 3000);
            setLoading(false)
        }
    
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => alert("Link copiado para a área de transferência!"))
            .catch((err) => console.error("Erro ao copiar o link:", err));
    };    

    const relatedProducts = products ? products.filter((p) => product ? product.relatedProducts?.includes(p.id || ""): undefined) : undefined;

    if (loading) {
        return <Loading />;
    }

    if (!product) {
        return <p>Produto não encontrado!</p>;
    }

    const price = product?.colors[selectedColor]?.price || 0;

    const totalPrice = price * quantity;

    return (
        <>
        <header>
            <NavBar />
        </header>
        <div className="product-page">
            <div className="main">
                <div className="image-gallery">
                <div className="thumbnails">
                    {product.colors[selectedColor]?.images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={product.name}
                            className={`thumbnail ${selectedImage === image ? "selected" : ""}`}
                            onClick={() => handleImageClick(image)}
                        />
                    ))}
                </div>
                    <div className="main-image">
                        <img src={selectedImage} alt={product.name} />
                    </div>
                </div>
                <div className="product-info">
                    <h1 className="product-name">{product.name}</h1>
                    <p className="product-description">
                        {product.description.split('*').map((line, index) => (
                            <span key={index}>
                                {line}
                                <br />
                            </span>
                        ))}
                    </p>

                    <div className="color-selector">
                        {product.colors.map((color, index) => (
                            <div
                                key={index}
                                className={`color-option ${selectedColor === index ? "selected" : ""}`}
                                onClick={() => handleColorChange(index)}
                            >
                                <img className="color-selector-image" src={color.images[0]} alt={color.name} />
                                <p>{color.name}</p>
                            </div>
                        ))}
                    </div>
                    <p className="product-price">Preço: R$ {totalPrice.toFixed(2)}</p>
                    <p className="product-stock">
                    {Number(stock) >= 1 ? (
                            <p>Estoque: {stock}</p>
                        ) : (
                            <p>Estoque zerado, o prazo de entrega será enviado por WhatsApp.</p>
                        )}

                    </p>

                    <div className="size-selector">
                        <h3>Selecione o Tamanho</h3>
                        <div className="sizes">
                            {(product?.colors[selectedColor]?.sizes ?? []).map((size, index) => (
                                <button
                                    key={index}
                                    className={`size-option ${selectedSize === size.name ? "selected" : ""}`}
                                    onClick={() => handleSizeChange(size)}
                                >
                                    {size.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="quantity-selector">
                    <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                        <input
                            type="number"
                            className="quantity-input"
                            value={quantity}
                            readOnly
                        />
                    <button className="quantity-button" onClick={increaseQuantity}>-</button>
                    </div>
                    {/* <div className="shipping-section">
                        <input
                                type="text"
                                className="shipping-input"
                                placeholder="Calcular frete"
                                value={cep}
                                onChange={handleShippingCostChange}
                            />
                            <button className="calculate-shipping-button" onClick={handleCalculateShipping}>
                                Calcular Frete
                            </button>
                        {calculatedShipping && <p>Preço do Frete: R${calculatedShipping.toFixed(2)}</p>}
                        {estimatedTime && <p>Tempo estimado de entrega: {estimatedTime}</p>}
                    </div>

                        {calculatedShipping !== null && (
                            <p className="calculated-shipping">
                                Custo do frete: R$ {calculatedShipping.toFixed(2)}
                            </p>
                        )} */}

                    <button className="add-to-cart-button" onClick={handleAddCart}>Adicionar ao Carrinho</button>
                    <button className="share-button" onClick={handleShare}>Compartilhar</button>
                </div>
            </div>

            {/* Popup de sucesso */}
            {popupVisible && (
                <div className="popup">
                    <p>Produto adicionado ao carrinho!</p>
                </div>
            )}

            <div className="reviews-section">
                <h2>Avaliações</h2>
                {product.reviews.length > 0 ? (
                    <div className="reviews-list">
                        {product.reviews.map((review) => (
                            <div key={review.id} className="review-card">
                                <p className="review-comment">"{review.comment}"</p>
                                <p className="review-stars">
                                    {"★".repeat(review.stars)}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Não há avaliações ainda.</p>
                )}
                <div className="review-form">
                    <h3>Deixe sua avaliação</h3>
                    <div className="stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${newReview.stars >= star ? 'filled' : 'empty'}`}
                                onClick={() => handleStarClick(star)}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                    <textarea
                        value={newReview.comment}
                        onChange={handleReviewChange}
                        placeholder="Escreva sua avaliação..."
                    />
                    <button className="submit-review-button" onClick={submitReview}>
                        Enviar Avaliação
                    </button>
                </div>
            </div>
            <div className="relatedProducts-section">
            {relatedProducts && relatedProducts.length > 0 ? (
                <ul>
                {relatedProducts.map((related) => (
                    <li key={related.id}>{related.name}</li>
                ))}
                </ul>
            ) : (
                <p>Não há produtos relacionados.</p>
            )}
            </div>
        </div>
        </>
    );
}