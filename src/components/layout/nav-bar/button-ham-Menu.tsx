"use client";
import { Menu } from "lucide-react";
import { useToggle } from "../../common/toggle-provider";

export function HamMenu() {
  const { toggleSidebar } = useToggle();
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
