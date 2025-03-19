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
    <html lang="en">
      <Head>
                  <title>Hype GR</title>
        <meta name="description" content="By Gusttavo Dev" />
      </Head>
      <body>
              {children}
      </body>
    </html>
  );
}


