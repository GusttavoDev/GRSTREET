import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import Head from "next/head"; // Corrigido: usar "next/head" para componentes no lado do cliente
import "./layout.css";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br">
                <Head>
                <title>GR Street</title>
                <meta name="description" content="Encontre as melhores roupas masculinas na GR Street." />
                <meta name="keywords" content="roupas masculinas, blucas, casacos, calças, multi marcas, tenis, acessorios, roupa cristão" />
                <meta property="og:title" content="GR Street - Moda Masculina" />
                <meta property="og:url" content="https://grstreet.com" />
            </Head>
      <body>
              {children}
      </body>
    </html>
  );
}


