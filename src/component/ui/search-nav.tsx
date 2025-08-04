"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "../context/side-bar-provider";

export default function SearchNav() {
  const { closeSidebar } = useSidebar();
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
