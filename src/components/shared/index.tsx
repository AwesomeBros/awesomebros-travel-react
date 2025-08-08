import { Outlet } from "react-router-dom";
import Header from "./header/header";

export default function Container() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full max-w-[1200px] mx-auto px-2 md:px-0 pt-6 pb-10">
        <Outlet />
      </div>
    </main>
  );
}
