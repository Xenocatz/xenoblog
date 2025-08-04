"use client";
import { useSidebar } from "../context/side-bar-provider";
import NavList from "../ui/nav-list";

export default function Sidebar() {
  const { isOpen } = useSidebar();
  return (
    <aside>
      <div
        className={`fixed h-screen w-64 flex-col border-r border-zinc-900 bg-zinc-950 px-3 py-3 transition-transform ease-in-out lg:static ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <NavList />
      </div>
    </aside>
  );
}
