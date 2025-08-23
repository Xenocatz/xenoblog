"use client";

import { useToggle } from "@/components/common";
import { NavList } from "./nav-list";
import { HamMenu } from "../nav-bar";

export function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useToggle();
  return (
    <aside
      className={`absolute top-0 left-0 z-20 border-r border-jet-500/30 transition-all duration-300 ease-in-out lg:static lg:w-fit lg:max-w-64 ${isSidebarOpen ? "ml-0" : "-ml-64 max-w-64"}`}
    >
      {/* overlay */}
      <div
        className={`lg:hidden ${isSidebarOpen ? "fixed inset-0 z-10 bg-black/50" : "hidden"}`}
        onClick={closeSidebar}
      ></div>
      {/* sidebar */}
      <div className="relative z-20 h-screen">
        <div className="h-full max-w-64 bg-charcoal-100">
          <div className="ml-6 flex items-center gap-5 pt-5 lg:hidden">
            <HamMenu />
            <h1 className="font-parkinsans text-xl">
              Xeno<span className="font-semibold">Blog</span>
            </h1>
          </div>
          <div className={`flex flex-col items-center px-3 py-3`}>
            <NavList />
          </div>
        </div>
      </div>
    </aside>
  );
}
