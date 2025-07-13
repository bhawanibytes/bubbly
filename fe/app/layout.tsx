import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bubbly",
  description: "Enjoy Whatsapp & Discord both's at one platform: Bubbly, Made with Love ❤️ in India by Bhawani Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        {children}
      </body>
    </html>
  );
}
