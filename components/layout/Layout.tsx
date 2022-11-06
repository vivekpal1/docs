import React, { useContext, useEffect } from "react";
import { DarkmodeContext } from "../../context/DarkModeContext";
import { SidebarContext } from "../../context/SidebarContext";
import Nav from "./nav";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";

interface LayoutProps {
  children: JSX.Element | JSX.Element[];
}

function Layout({ children }: LayoutProps) {
  const router = useRouter();
  /* @ts-ignore */
  const { darkmode } = useContext(DarkmodeContext);
  /* @ts-ignore */
  const { sidebar, toggleSidebar } = useContext(SidebarContext);

  useEffect(() => {
    console.log(router.pathname);
    if (!router.pathname) return;
    if (!router.pathname.startsWith("/Docs")) {
      toggleSidebar(false);
    } else {
      toggleSidebar(true);
    }
  }, [router.pathname]);

  return (
    <div className={`${darkmode && "dark"}`}>
      <div className="relative flex min-h-screen w-full flex-col items-center dark:bg-slate-900">
        <Nav />
        <div className="z-10 w-full max-w-[90rem] flex-1 px-4 sm:px-6 md:px-8">
          <Sidebar />
          <main className={`${sidebar && "lg:pl-[19.5rem]"}`}>{children}</main>
        </div>
        <div className="griddy fixed top-16 h-48 w-full opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-900" />
        </div>
      </div>
    </div>
  );
}

export default Layout;
