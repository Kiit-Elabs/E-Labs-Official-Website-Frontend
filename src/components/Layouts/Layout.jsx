import { Outlet } from "react-router-dom";
import Navbar from "../mainComponents/Navbar";
import Footer from "../mainComponents/Footer";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";

function Layout() {
  return (
    <HeroUIProvider locale="en-IN" className="font-verna">
      <ToastProvider
        toastOffset={10}
        maxVisibleToasts={1}
        toastProps={{
          className: "fixed bottom-10 right-10 z-50 pointer-events-auto",
        }}
      />
      <div className="flex flex-col dark:bg-[#ffd4b3]">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </HeroUIProvider>
  );
}

export default Layout;
