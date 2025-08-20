import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header/header";

export default function Container() {
  return (
    <main className="flex flex-col min-h-screen bg-[#f3f1ef]">
      <Header />
      <div className="size-full min-h-[calc(100vh-97px-64px)] max-w-[1200px] mx-auto px-2 md:px-0 pt-6 pb-10">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
