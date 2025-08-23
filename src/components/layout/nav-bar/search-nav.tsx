"use client";
import { useToggle } from "@/components/common";
import { Search } from "lucide-react";
import Link from "next/link";

export function SearchNav() {
  const { closeSidebar } = useToggle();
  return (
    <Link href="/search" onClick={closeSidebar} className="lg:hidden">
      <Search
        strokeWidth={1.5}
        size={24}
        className="text-white/80 hover:text-white"
      />
    </Link>
  );
}
