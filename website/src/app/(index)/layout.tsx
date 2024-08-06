"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import "./globals.css";

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
      </body>
    </html>
  );
}
