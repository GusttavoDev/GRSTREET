"use client"
import React from "react";
import Slider from "react-slick";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";

// Configurações do carrossel
const carouselSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const productData = [
  { id: 1, name: "Fones", image: "https://media.discordapp.net/attachments/1264276060086866023/1264760797083734016/Screenshot_20240721_214713_AliExpress.jpg?ex=66b02f48&is=66aeddc8&hm=6fce92018df3ba109a903b2be4a74f9e43a90a51af73130703c9760c691ede53&=&format=webp&width=703&height=701" },
  { id: 2, name: "Cabos", image: "https://media.discordapp.net/attachments/1264276060086866023/1264762028434657301/Screenshot_20240721_215134_AliExpress.jpg?ex=66b0306d&is=66aedeed&hm=71ffbc8326fe7bda438fb3fa58a0a7e6a9344dd81a86dd5846347d03956415d3&=&format=webp&width=704&height=701" },
  { id: 3, name: "Carregadores", image: "https://media.discordapp.net/attachments/1264276060086866023/1264763382020440074/Screenshot_20240721_215607_AliExpress.jpg?ex=66b031b0&is=66aee030&hm=92e3d8fafb7a3b9c1b7683778935f3a3f2c912b14788f2a5ca50c12c32985741&=&format=webp&width=700&height=701" },
  { id: 4, name: "Relogios", image: "https://images.samsung.com/is/image/samsung/assets/br/15363_New-Offer_Card-Pequeno_Desk.jpg?$330_330_JPG$" },
  { id: 5, name: "Adaptadres", image: "https://media.discordapp.net/attachments/1264276060086866023/1264924850812620931/Screenshot_20240722_083839_AliExpress.jpg?ex=66b01f51&is=66aecdd1&hm=d2a2af127f4493a57ffe41e468c9f3dffce02fd1e5454df84032b165970578a1&=&format=webp&width=704&height=701" },
];

export default function Home() {
  return (
    <>
      {/* Carrossel */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          <div><img src="https://assets2.razerzone.com/images/pnx.assets/0574f0137234bbfdf0ad9af7dcc25b12/axon-wallpaper-desktop-carousel-2.jpg" alt="Slide 1" /></div>
          <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiNtFl_remqCKjYMKGBJiWBWtHo0Yu-TNw6g&s" alt="Slide 2" /></div>
        </Slider>
      </div>

      <div>
        <h1 className="TitlePrincipalsHome">CATEGORIAS</h1>
        <div className="CategoriasHome">
            <ul>
                <li>Outros</li>
                <li>Outros</li>
                <li>Outros</li>
            </ul>
        </div>
      <div className="products-grid">
        <div key={productData[0].id} className="product-card large">
            <img src={productData[0].image} alt={productData[0].name} className="product-image" />
            <div className="product-info">
            <h2 className="product-name">{productData[0].name}</h2>
            <button className="product-button">Ver Mais</button>
            </div>
        </div>
        {productData.slice(1).map((product, index) => (
            <div key={product.id} className="product-card small">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <h2 className="product-name">{product.name}</h2>
                <button className="product-button">Ver Mais</button>
            </div>
            </div>
        ))}
        </div>
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
          <p>Email: goiabaudio@gamil.com</p>
          <p>Telefone: (11) 1234-5678</p>
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
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 CapyCom. Todos os direitos reservados.</p>
      </div>
    </footer>
    </>
  );
}
