export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-600">
      {children}
    </div>
  );
}
