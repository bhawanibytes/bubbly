import StoreProvider from "@/redux/StoreProvider";
import { Toaster } from "sonner";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <StoreProvider>
        <Toaster position="top-right" />
        {children}
      </StoreProvider>
    </>
  );
}
