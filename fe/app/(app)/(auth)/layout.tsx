import Navbar from "@components/Navbar";

export default function AuthLayout({
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
      <div className="">{children}</div>
    </>
  );
}
