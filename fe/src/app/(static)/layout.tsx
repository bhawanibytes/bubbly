import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function StaticLayout({
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
