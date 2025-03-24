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

const domain = Domain()
const url = `${domain}Products`

const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 700,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const listConfigUseCase = new ListConfigUseCase();

export default function Home() {
    const [configData, setConfig] = useState<IConfig>();
    
    const fetchConfig = async () => {
      const response: IConfig[] = await listConfigUseCase.execute();
      setConfig(response[0]);
    };

    useEffect(() => {
      fetchConfig();
    }, []);

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

            {configData && (
              <>
                <h1 className="TitlePrincipalsHome">CATEGORIAS</h1>
                <div className="products-grid">
                  <div className="product-card large">
                    <img src={configData.categorieImage1} alt={configData.categorieImageLink1} className="product-image" />
                    <div className="product-info">
                      <h2 className="product-name">{configData.categorieImageLink1}</h2>
                      <button className="product-button" onClick={() => {
                        window.location.href = `${url}?category=${configData.categorieImageLink1}`;
                      }}>
                        Ver Mais
                      </button>
                    </div>
                  </div>

                  <div className="product-card small">
                    <img src={configData.categorieImage2} alt={configData.categorieImageLink2} className="product-image" />
                    <div className="product-info">
                      <h2 className="product-name">{configData.categorieImageLink2}</h2>
                      <button className="product-button" onClick={() => {
                        window.location.href = `${url}?category=${configData.categorieImageLink2}`;
                      }}>
                        Ver Mais
                      </button>
                    </div>
                  </div>

                  <div className="product-card small">
                    <img src={configData.categorieImage3} alt={configData.categorieImageLink3} className="product-image" />
                    <div className="product-info">
                      <h2 className="product-name">{configData.categorieImageLink3}</h2>
                      <button className="product-button" onClick={() => {
                        window.location.href = `${url}?category=${configData.categorieImageLink3}`;
                      }}>
                        Ver Mais
                      </button>
                    </div>
                  </div>
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
