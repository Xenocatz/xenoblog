"use client";
import { Bookmark, HouseIcon, Newspaper, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/side-bar-provider";

interface NavListItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
}
export default function NavList() {
  return (
    <nav>
      <NavListItem label="Home" href="/" icon={HouseIcon} />
      <NavListItem label="My Articles" href="/my-articles" icon={Newspaper} />
      <NavListItem label="Bookmark" href="/bookmark" icon={Bookmark} />
    </nav>
  );
}

export function NavListItem({ label, href, icon: Icon }: NavListItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const { closeSidebar } = useSidebar();

  return (
    <>
      <Link
        href={href}
        onClick={closeSidebar}
        className={`relative flex w-full items-center gap-5 rounded-lg px-5 py-3 hover:bg-zinc-800 lg:hidden ${isActive ? "bg-zinc-800" : "bg-transparent"}`}
      >
        <div
          className={`absolute left-0 h-full w-0.5 rounded-full bg-white duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}
        />

        <Icon strokeWidth={1.5} />
        <span className="font-base text-sm">{label}</span>
      </Link>
      <Link
        href={href}
        className={`relative hidden w-full items-center gap-5 rounded-lg px-5 py-3 hover:bg-zinc-800 lg:flex ${isActive ? "bg-zinc-800" : "bg-transparent"}`}
      >
        <div
          className={`absolute left-0 h-full w-0.5 rounded-full bg-white duration-200 ${isActive ? "opacity-100" : "opacity-0"}`}
        />

        <Icon strokeWidth={1.5} />
        <span className="font-base text-sm">{label}</span>
      </Link>
    </>
  );
}
