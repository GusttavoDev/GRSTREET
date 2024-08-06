"use client";
import { useEffect, useState } from "react";
import IProduct from "@/entities/IProduct";
import GetProductByIdUseCase from "@/connection/Product/UseCases/GetProductByUseCase";
import "./style.css";

const getProductByIdUseCase = new GetProductByIdUseCase();

export default function Product({ params }: { params: { id: number } }) {
    const [product, setProduct] = useState<IProduct | undefined>(undefined);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [loading, setLoading] = useState(true);
    const [newReview, setNewReview] = useState({ comment: '', stars: 0 });
    const [shippingCost, setShippingCost] = useState('');

    useEffect(() => {
        async function fetchProduct(): Promise<void> {
            try {
                const req = await getProductByIdUseCase.execute(String(params.id));
                
                if (req && req.images && req.images.length > 0) {
                    setProduct(req);
                    setSelectedImage(req.images[0]);
                    setSelectedColor(0);  // Seleciona a primeira cor por padrão
                } else {
                    console.error("Produto não encontrado ou dados incompletos.");
                }
            } catch (error) {
                console.error("Erro ao buscar o produto:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [params.id]);

    const handleImageClick = (image: string) => {
        setSelectedImage(image);
    };

    const handleColorChange = (index: number) => {
        setSelectedColor(index);
        setSelectedImage(product?.colors[index].images[0] || '');
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

    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };
    
    const decreaseQuantity = () => {
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Quantidade mínima de 1
    };

    const handleShippingCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShippingCost(e.target.value);
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!product) {
        return <p>Produto não encontrado!</p>;
    }

    const price = product.colors[selectedColor].price;
    const totalPrice = price * quantity;

    return (
        <div className="product-page">
            <div className="main">
                <div className="image-gallery">
                    <div className="thumbnails">
                        {product.images.map((image, index) => (
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
                    <p className="product-description">{product.description}</p>
                    <div className="color-selector">
                        {product.colors.map((color, index) => (
                            <div
                                key={index}
                                className={`color-option ${selectedColor === index ? "selected" : ""}`}
                                onClick={() => handleColorChange(index)}
                            >
                                <img src={color.images[0]} alt={color.name} />
                            </div>
                        ))}
                    </div>
                    <p className="product-price">Preço: R$ {totalPrice.toFixed(2)}</p>
                    <p className="product-stock">Estoque: {product.colors[selectedColor].stock}</p>
                    <div className="quantity-selector">
                        <button className="quantity-button" onClick={decreaseQuantity}>-</button>
                        <input
                            type="number"
                            className="quantity-input"
                            value={quantity}
                            readOnly
                        />
                        <button className="quantity-button" onClick={increaseQuantity}>+</button>
                    </div>
                    <div className="shipping-section">
                        <input
                            type="text"
                            className="shipping-input"
                            placeholder="Calcular frete"
                            value={shippingCost}
                            onChange={handleShippingCostChange}
                        />
                        <button className="calculate-shipping-button">Calcular Frete</button>
                    </div>
                    <button className="add-to-cart-button">Adicionar ao Carrinho</button>
                    <button className="share-button">Compartilhar</button>
                </div>
            </div>

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
            <div className="related-products-section">
            <h2>Produtos Relacionados</h2>
            <div className="related-products-container">
                {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="related-product-card">
                        <img
                            src={`https://via.placeholder.com/200x200?text=Produto+${index + 1}`}
                            alt={`Produto ${index + 1}`}
                        />
                        <p className="product-name">Produto {index + 1}</p>
                        <p className="product-price">R$ {(index + 1) * 100}.00</p>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
}
