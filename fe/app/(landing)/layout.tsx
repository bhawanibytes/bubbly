import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bubbly",
  description:
    "Enjoy Whatsapp & Discord both's at one platform: Bubbly, Made with Love ❤️ in India by Bhawani Singh",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="mx-10">
        <Navbar />
      </header>
      <div className="w-full border-t-2 border-[#F2F2F2]"></div>
      {children}
      <footer className="mx-40">
        <Footer />
      </footer>
    </>
  );
}
