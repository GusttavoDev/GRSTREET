import IProduct from "@/entities/IProduct";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import "./style.css"
import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";
import Slider from "react-slick";

const listProductsUseCase = new ListProductsUseCase();


export default function ProductsDestaqued() {
    const [products, setProducts] = useState<IProduct[]>();
    const [productsDestaqued, setProductsDestaqued] = useState<IProduct[]>([]);
    const router = useRouter();
    const [slidesToShow, setSlidesToShow] = useState(7);
    
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
        
        const updateSlidesToShow = () => {
            setSlidesToShow(window.innerWidth < 768 ? 5 : 7);
        };
        
        updateSlidesToShow(); // Chama ao carregar
        
        // Adiciona um listener para quando a tela for redimensionada
        window.addEventListener("resize", updateSlidesToShow);
        
        // Limpa o listener ao desmontar o componente
        return () => {
            window.removeEventListener("resize", updateSlidesToShow);
        };
    }, []);    
    
    const carouselSettingsDestaquedProducts = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: slidesToShow,  // Agora exibe 5 produtos ao mesmo tempo
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
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
