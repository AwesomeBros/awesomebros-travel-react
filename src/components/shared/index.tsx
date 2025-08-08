import { Outlet } from "react-router-dom";
import Header from "./header/header";

export default function Container() {
  return (
    <main className="flex flex-col min-h-screen gap-10">
      <Header />
      <div className="w-full max-w-[1200px] mx-auto px-2 md:px-0">
        <Outlet />
      </div>
    </main>
  );
}
