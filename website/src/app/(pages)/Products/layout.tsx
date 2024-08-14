export const metadata = {
  title: 'Goiabaudio',
  description: 'By Gusttavo Dev',
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./layout.css";
import { faFacebook, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <div className="navbar-logo">
            <a href="#">GoiaBaudio</a>
          </div>
          <div className="navbar-toggle">
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="navbar-links">
            <ul>
              <li><a href="#">Inicio</a></li>
              <li><a href="#">Ofertas</a></li>
              <li><a href="#">Populares</a></li>
              <li><a href="#">Fale Conosco</a></li>
            </ul>
          </div>
          <div className="navbar-icons">
            <div className="navbar-search">
              <input type="text" placeholder="Search..."/>
              <FontAwesomeIcon icon={faSearch} className="search-icon"/>
            </div>
            <a href="#" className="navbar-icon">
              <FontAwesomeIcon icon={faShoppingCart} />
            </a>
            <a href="#" className="navbar-icon">
              <FontAwesomeIcon icon={faUser} />
            </a>
          </div>
        </nav>
        {children}
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
      </body>
    </html>
  );
}
