export const metadata = {
  title: 'Goiabaudio',
  description: 'By Gusttavo Dev',
}

import "./layout.css";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
