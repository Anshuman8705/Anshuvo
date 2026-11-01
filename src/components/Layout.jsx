import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Toast from "./Toast.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-3 focus:text-link">Skip to content</a>
      <p className="bg-amber-100 px-3 py-1 text-center text-xs text-ink" role="note">
        ANSHUVO is a student demo store. Nothing is sold and no card is ever charged. Use the test card 4242 4242 4242 4242 at checkout.
      </p>
      <Header />
      <div id="main-content" tabIndex={-1} className="min-w-0 flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toast />
    </div>
  );
}
