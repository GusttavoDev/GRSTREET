"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faShoppingCart,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useRouter } from "next/navigation";
import IUser from "@/entities/IUser";
import GetUserUseCase from "@/connection/User/UseCases/GetUserUseCase";
import ListProductsUseCase from "@/connection/Product/UseCases/ListProductsUseCase";

import "./styles.css";
import IProduct from "@/entities/IProduct";
import Domain from "@/connection/domain";

const getUserUseCase = new GetUserUseCase();
const listProductsUseCase = new ListProductsUseCase();

const domain = Domain();

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [authStatus, setAuthStatus] = useState<string>("Checking authentication...");
  const [userData, setUserData] = useState<Omit<IUser, "token"> | null>(null);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleCart = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/User/Carrinho");
  };
  const togglePurchases = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/User/Pedidos");
  };
  const toggleMyAcount = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/User/MyAccount");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Não fecha a lista de busca quando o clique for dentro da área de busca
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node) &&
        search === ""
      ) {
        setIsSearching(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [search]);

  const handleProductClick = (productId: string) => {
    setSearch(""); // Limpa o campo de busca ao selecionar um produto
    setFilteredProducts([]); // Esconde a lista de produtos
    setIsSearching(false); // Fecha a lista de busca
    router.push(`/Products/${productId}`);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${domain}pages/api/check-auth-user`
        );
        const data = response.data;
        setAuthStatus(data.status);
        if (data.status === "Authenticated") {
          const token = String(window.localStorage.getItem("token"));
          const user = await getUserUseCase.execute(token);
          setUserData(user);
        }
      } catch (error) {
        setAuthStatus("Error checking authentication");
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!search) {
        setFilteredProducts([]);
        setIsSearching(false);
        return;
      }
      try {
        const products = await listProductsUseCase.execute();
  
        // Função para remover acentos
        const removeAccents = (str: string) => {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };
  
        const filtered = products
          .filter((product: IProduct) =>
            removeAccents(product.name.toLowerCase()).includes(removeAccents(search.toLowerCase()))
          )
          .slice(0, 3); // Limita a 3 produtos
  
        setFilteredProducts(filtered);
        setIsSearching(true);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
  
    fetchProducts();
  }, [search]);
  
  const handleLogOut = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.get(`${domain}pages/api/unset-auth-user`);
      window.localStorage.removeItem("token");
      router.push("/");
      window.location.reload();
    } catch (error) {
      setAuthStatus("Ouve Algum Erro");
    }
  };

  return (
    <>
    <link rel="icon" type="image/jpg" href="/logo.jpg" />
              <title>Hype GR</title>
    <nav className="navbar">
      <div className="navbar-logo">
        <a href={domain}>GR Street</a>
      </div>
      {/* <div className="navbar-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faUser as IconProp} />
      </div> */}
      <div className="navbar-links">
        <ul>
          <li>
            <a href={domain}>Inicio</a>
          </li>
          <li>
            <a href={`${domain}Products`}>Produtos</a>
          </li>
          <li>
            <a href="https://www.instagram.com/grstreetofc/">Fale Conosco</a>
          </li>
        </ul>
      </div>
      <div className="navbar-icons">
        <div className="navbar-search" ref={searchContainerRef}>
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            // autoComplete="off"
            autoComplete="off"
            />
          <FontAwesomeIcon icon={faSearch as IconProp} className="search-icon" />

          {isSearching && filteredProducts.length > 0 && (
            <div className="search-results">
              {filteredProducts.map((product) => (
                <div
                key={product.id}
                className="search-item"
                onClick={() => handleProductClick(String(product.id))}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="search-item-img"
                    />
                  <div className="search-item-info">
                    <p className="search-item-name">{product.name}</p>
                    <p className="search-item-price">
                      R$ {product.colors[0].price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <a href="#" onClick={toggleCart} className="navbar-icon">
          <FontAwesomeIcon icon={faShoppingCart as IconProp} />
        </a>
        <a href="#" onClick={toggleMenu} className="navbar-icon">
          <FontAwesomeIcon icon={faUser as IconProp} />
        </a>
      </div>

      {/* Menu offcanvas */}
      <div className={`offcanvas ${isOpen ? "open" : ""}`}>
        <div className="offcanvas-header">
          <button className="offcanvas-close" onClick={closeMenu}>
            <FontAwesomeIcon icon={faTimes as IconProp} />
          </button>
          {authStatus === "Authenticated" ? (
            <>
              {/* <img src={userData?.personal_data.profile_img} alt="User Profile" /> */}
              <span className="user-name">{userData?.personal_data.name}</span>
            </>
          ) : (
            <div className="offcanvas-header-content">
              <FontAwesomeIcon icon={faUser as IconProp} />
            </div>
          )}
        </div>

        <ul className="offcanvas-links">
          {authStatus === "Authenticated" ? (
            <>
              <li>
                <a href="#" onClick={toggleMyAcount}>Minha Conta</a>
              </li>
              <li>
                <a href="#" onClick={toggleCart} className="navbar-icon">
                  <span>Meu Carrinho</span>
                </a>
              </li>
              <li>
                <a href="#" onClick={togglePurchases}>
                  <span>Meus Pedidos</span>
                </a>
              </li>
              <li>
                <a onClick={handleLogOut}>Sair</a>
              </li>
            </>
          ) : (
            <li>
              <a href="/User/Login" className="offcanvas-login">
                Entrar
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
          </>
  );
}
