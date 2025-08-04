"use client";
import { Menu } from "lucide-react";
import { useSidebar } from "../context/side-bar-provider";

export default function HamMenu() {
  const { toggleSidebar } = useSidebar();
  return (
    <button onClick={toggleSidebar}>
      <Menu
        strokeWidth={1.5}
        size={24}
        className="cursor-pointer text-white/80 hover:text-white"
      />
    </button>
  );
}
