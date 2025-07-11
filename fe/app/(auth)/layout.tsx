export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className="h-screen w-full bg-gray-600 flex justify-center items-center">{children}</div>;
}