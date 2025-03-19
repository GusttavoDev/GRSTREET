export const metadata = {
  title: 'Hype GR',
  description: 'By Gusttavo Dev',
}

import "./layout.css";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
