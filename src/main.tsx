import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import QueryProvider from "./components/provider/query-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
