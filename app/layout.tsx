import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
