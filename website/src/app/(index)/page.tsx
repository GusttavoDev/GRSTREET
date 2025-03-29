"use client"
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

import ListConfigUseCase from "@/connection/Config/UseCases/ListConfigUseCase";
import IConfig from "@/entities/IConfig";
import NavBar from "../components/navbar/NavBar";
import Loading from "../components/loading/Loading";
import ProductsDestaqued from "./components/ProductsDestaqued/ProductsDestqued";
import Domain from "@/connection/domain";
import Head from "next/head";
import type IProduct from "@/entities/IProduct";
import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";
import ListCategoriesUseCase from "@/connection/Categories/UseCases/ListCategoriesUseCase";
import { useSearchParams } from "next/navigation";
import type ICategory from "@/entities/ICategory";

const domain = Domain()
const url = `${domain}Products`

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true, // Ativa o autoplay
  autoplaySpeed: 2000, // Define o tempo de cada slide (em milissegundos)
};

const listConfigUseCase = new ListConfigUseCase();
const listProductsUseCase = new ListProductsUseCase();
const listCategoriesUseCase = new ListCategoriesUseCase();

function SearchParamsWrapper({ setSelectedCategory, categories }: { setSelectedCategory: (id: string | undefined) => void; categories: ICategory[] | undefined }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const searchQuery = searchParams.get('category') || undefined;
        if (categories && searchQuery) {
            const newCategoryQuery = categories.filter((category: ICategory) => category.name === searchQuery);
            if (newCategoryQuery.length > 0) {
                setSelectedCategory(String(newCategoryQuery[0].id));
            }
        }
    }, [searchParams, categories]);

    return null;
}

export default function Home() {
    const [configData, setConfig] = useState<IConfig>();
    const [products, setProducts] = useState<IProduct[] | undefined>(undefined);
    const [categories, setCategories] = useState<ICategory[] | undefined>(undefined);
    const [slidesToShow, setSlidesToShow] = useState(3);
    
    const fetchConfig = async () => {
      const response: IConfig[] = await listConfigUseCase.execute();
      setConfig(response[0]);
    };

    useEffect(() => {
      fetchConfig();
      async function fetchProducts() {
        try {
            const req = await listProductsUseCase.execute();
            const formattedProducts = req.map((product: any) => ({
                ...product,
                category: product.categoryId,
                sub_category: product.subCategoryId,
            }));
            setProducts(formattedProducts);
        } catch (error) {
            console.error('Erro ao buscar os produtos:', error);
        } finally {
            // setLoading(false);
        }
    }
    async function fetchCategories() {
      try {
          const response = await listCategoriesUseCase.execute();
          setCategories(response);
      } catch (error) {
          console.error('Erro ao buscar as categorias:', error);
      }
  }

  fetchProducts();
  fetchCategories();

  const updateSlidesToShow = () => {
    setSlidesToShow(window.innerWidth < 768 ? 2 : 3);
  };

  updateSlidesToShow(); // Chama ao carregar

  // Adiciona um listener para quando a tela for redimensionada
  window.addEventListener("resize", updateSlidesToShow);

  // Limpa o listener ao desmontar o componente
  return () => {
    window.removeEventListener("resize", updateSlidesToShow);
  };
    }, []);

    
  const carouselSettingsProducts = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: slidesToShow,  // Usa o estado para definir o número de slides
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    appendDots: (dots: React.ReactNode) => (
      <div className="custom-dots-container">
        <ul className="custom-dots"> {dots} </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <button className="custom-dot"></button>
    )
  };

  return (
    <>
              <Head>
                <title>GR Street</title>
                <meta name="description" content="Encontre as melhores roupas masculinas na GR Street." />
                <meta name="keywords" content="roupas masculinas, blucas, casacos, calças, multi marcas, tenis, acessorios, roupa cristão" />
                <meta property="og:title" content="GR Street - Moda Masculina" />
                <meta property="og:url" content="https://grstreet.com" />
            </Head>
      {!configData ? (
        <Loading />
      ) : (
        <>
          <header>
            
            <NavBar></NavBar>
          </header>

          <div className="carousel-container">
            <Slider {...carouselSettings}>
              {configData.banner1 && <div><img src={configData.banner1} alt="Slide 1" /></div>}
              {configData.banner2 && <div><img src={configData.banner2} alt="Slide 2" /></div>}
              {configData.banner3 && <div><img src={configData.banner3} alt="Slide 3" /></div>}
            </Slider>
          </div>

          <div>
            {configData && (
              <div className="CategoriasHome">
                <ul>
                  {[configData.categorie1, configData.categorie2, configData.categorie3].map((categorie, index) => (
                    <li key={index} onClick={() => {
                      window.location.href = `${url}?category=${categorie}`;
                    }}>
                      {categorie}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ProductsDestaqued />

            {configData && categories && (
              <>
                {/* <h1 className="TitlePrincipalsHome">CATEGORIAS</h1> */}
                <div className="categories-grid">
  {categories
    ?.filter((category) => category.destaqued) // Filtra as categorias em destaque
    .map((category, index) => {
      const categoryProducts = products?.filter((product) => product.category === category.id);

      return (
        <>
          <h3 className="titleNameCategory">{category.name}</h3>
          <div key={category.id} className={`category-card ${index === 0 ? "large" : "small"}`}>
            {/* Imagem da categoria */}
            <img src={category.image} alt={category.name} className="category-image" />

            <div className="GridProducts">
              {/* Carrossel de produtos da categoria */}
                  <div className="category-products-carousel">
                    <div className="products-scroll" id={`products-scroll-${index}`}>
                      <Slider {...carouselSettingsProducts}>
                        {categoryProducts?.slice(0, 4).map((product) => (
                          <div
                            key={product.id}
                            className="product-card"
                            onClick={() => {
                              window.location.href = `${url}/${product.id}`;
                            }}
                          >
                            <img src={product.images[0]} alt={product.name} className="product-image" />
                            <h3 className="product-name">{product.name}</h3>
                            <p className="product-price">R$ {product.colors[0].price.toFixed(2)}</p>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                  <div className="VerMaisDiv">
                    <button
                      className="view-button"
                      onClick={() => {
                        window.location.href = `${url}?category=${configData?.[(`categorieImage${index + 1}` as keyof IConfig)]}`;
                      }}
                    >
                      Ver Mais
                      </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
              </>
            )}
          </div>

          <footer className="footer">
            <div className="footer-container">
              <div className="footer-section">
                <h3>Sobre Nós</h3>
                <p>Descubra mais sobre nossa empresa e o que fazemos.</p>
              </div>
              <div className="footer-section">
                <h3>Links Rápidos</h3>
                <ul>
                  <li><a href="/">Início</a></li>
                  <li><a href="/produtos">Produtos</a></li>
                  <li><a href="/contato">Contato</a></li>
                  <li><a href="/sobre">Sobre</a></li>
                </ul>
              </div>
              <div className="footer-section">
                <h3>Contato</h3>
                <p>Email: grstreetofc@gamil.com</p>
                <p>Telefone: (21) 9 6786-2010</p>
              </div>
              <div className="footer-section">
                <h3>Siga-nos</h3>
                <div className="social-icons">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faTwitter} />
                  </a>
                  <a href="https://www.instagram.com/grstreetofc/" target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faInstagram} />
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 CapyCom. Todos os direitos reservados.</p>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
