"use client";

import { useEffect, useState } from 'react';
import "./layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faChartLine, faGear, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// Isso permite que você use IconDefinition diretamente

import Head from 'next/head';
import Link from 'next/link';
import ToggleUser from './components/ToggleUser';
import axios from 'axios';
import Domain from '@/connection/domain';

const icons: IconDefinition[] = [faHome, faBox, faChartLine, faGear, faUser];
const domain = Domain()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [authStatus, setAuthStatus] = useState<string>('Checking authentication...');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toggleUser, setToggleUser] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
      const checkAuth = async () => {
          try {
              const response = await axios.get(`${domain}pages/api/check-auth`);
              const data = response.data;
              setAuthStatus(data.status);
          } catch (error) {
              setAuthStatus('Error checking authentication');
          }
      };

      checkAuth();
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Painel Admin</title>
        <meta name="description" content="By Gusttavo Dev" />
      </Head>
      <body>
        <nav className="navbar">
          <div className="navbar-logo">
            <a href="#">GR Street</a>
          </div>
          {authStatus === "Authenticated" && <>
            <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
              <ul>
                <li><Link href="/Admin"><FontAwesomeIcon icon={faHome} /> Inicio</Link></li>
                <li><Link href="/Admin/Products"><FontAwesomeIcon icon={faBox} /> Produtos</Link></li>
                <li><Link href="/Admin/Analytics"><FontAwesomeIcon icon={faChartLine} /> Analytics</Link></li>
                <li><Link href="/Admin/Config"><FontAwesomeIcon icon={faGear} /> Configurações</Link></li>
                {toggleUser && <ToggleUser />}
              </ul>
            </div>
            <div className="navbar-icons">
              <a href="#" className="navbar-icon navbar-toggle-pc" onClick={() => setToggleUser(!toggleUser)}>
                <FontAwesomeIcon icon={faUser} />
              </a>
              <div className="navbar-toggle" onClick={toggleMenu}>
                <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
          </>
          }
        </nav>
        {children}
      </body>
    </html>
  );
}
