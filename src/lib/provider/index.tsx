import { Toaster } from "@/components/ui/sonner";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import ModalProvider from "./modal-provider";
import QueryProvider from "./query-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <CookiesProvider>
        <Router>{children}</Router>
        <ModalProvider />
        <Toaster />
      </CookiesProvider>
    </QueryProvider>
  );
}
