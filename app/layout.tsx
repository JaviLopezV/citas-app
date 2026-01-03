import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import MuiProvider from "./mui-provider";
import { Providers } from "./providers"; // tu SessionProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Providers>
          <MuiProvider>{children}</MuiProvider>
        </Providers>
      </body>
    </html>
  );
}
