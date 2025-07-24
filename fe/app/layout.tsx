import "./globals.css";
import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Toaster position="top-right" />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
