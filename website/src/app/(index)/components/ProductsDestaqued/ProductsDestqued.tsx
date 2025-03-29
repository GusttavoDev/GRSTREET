import IProduct from "@/entities/IProduct";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import "./style.css"
import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";
import Slider from "react-slick";

const listProductsUseCase = new ListProductsUseCase();

const carouselSettingsDestaquedProducts = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 7,  // Agora exibe 5 produtos ao mesmo tempo
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
};

export default function ProductsDestaqued() {
    const [products, setProducts] = useState<IProduct[]>();
    const [productsDestaqued, setProductsDestaqued] = useState<IProduct[]>([]);
    const router = useRouter();

    const fetchProducts = async () => {
        try {
            const req = await listProductsUseCase.execute();
            const formattedProducts = req.map((product: any) => ({
                ...product,
                category: product.categoryId,
                sub_category: product.subCategoryId,
            }));
            setProducts(formattedProducts);
            setProductsDestaqued(formattedProducts.filter((product) => product.destaqued));
        } catch (error) {
            console.error('Erro ao buscar os produtos:', error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);    

    return (
        <section className="product-destaqued-section">
            <h2 className="product-destaqued-title">Produtos em Destaque</h2> {/* Título adicionado */}
            <ul className="product-destaqued-list">
            {productsDestaqued.length > 0 ? (
        <Slider {...carouselSettingsDestaquedProducts}>
                {productsDestaqued.map((product) => (
                    <li
                        className="product-destaqued"
                        key={product.id}
                        onClick={() => router.push(`/Products/${product.id}`)}
                    >
                        <img src={product.images[0]} alt={product.name} />
                        <p className="product-destaqued-price">
                            <span className="span-border">
                                R$ {product.colors[0].price.toFixed(2)}
                            </span>
                        </p>
                    </li>
                    ))} 
                </Slider>
            ) : (
                <p>Nenhum produto em destaque encontrado.</p>
            )}
            </ul>
        </section>

    );
}
