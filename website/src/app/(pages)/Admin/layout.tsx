"use client";

import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./layout.css";
import { faBox, faChartLine, faGear, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import Head from 'next/head';
import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <html lang="en">
      <Head>
        <title>Painel Admin</title>
        <meta name="description" content="By Gusttavo Dev" />
      </Head>
      <body>
        <nav className="navbar">
          <div className="navbar-logo">
            <a href="#">GoiaBaudio</a>
          </div>
          <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><Link href="/Admin"><FontAwesomeIcon icon={faHome} /> Inicio</Link></li>
              <li><Link href="/Admin/Products"><FontAwesomeIcon icon={faBox} /> Produtos</Link></li>
              <li><Link href="/Admin/Analytics"><FontAwesomeIcon icon={faChartLine} /> Analytics</Link></li>
              <li><Link href="/Admin/Config"><FontAwesomeIcon icon={faGear} /> Configurações</Link></li>
            </ul>
          </div>
          <div className="navbar-icons">
            <a href="#" className="navbar-icon navbar-toggle-pc">
              <FontAwesomeIcon icon={faUser} />
            </a>
          <div className="navbar-toggle" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faUser} />
          </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
