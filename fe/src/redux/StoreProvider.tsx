"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("Provider Rendered");
  return <Provider store={store}>{children}</Provider>;
}
