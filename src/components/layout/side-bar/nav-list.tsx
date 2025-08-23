"use client";
import { Bookmark, HouseIcon, Newspaper, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useToggle } from "../../common/toggle-provider";

interface NavListItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
}
export function NavList() {
  return (
    <nav className="min-w-60">
      <NavListItem label="Home" href="/" icon={HouseIcon} />
      <NavListItem label="My Articles" href="/my-articles" icon={Newspaper} />
      <NavListItem label="Bookmark" href="/bookmark" icon={Bookmark} />
    </nav>
  );
}

export function NavListItem({ label, href, icon: Icon }: NavListItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const { closeSidebar } = useToggle();

  // stylingnya
  const baseClasses = `relative  items-center gap-5 rounded-r-lg px-5 py-3 group hover:text-jet-100 duration-200 ${
    isActive
      ? "text-jet-100 bg-linear-90 from-red-soft/10 to-transparent"
      : "text-jet-100/70"
  }`;

  const lineClasses = `absolute top-0 left-0 h-full  rounded-full w-0.5  opacity-0 duration-300  ${
    isActive ? "opacity-100 bg-red-soft" : "group-hover:opacity-50 bg-jet-100"
  }`;

  return (
    <>
      {/* Mobile */}
      <Link
        href={href}
        onClick={closeSidebar}
        className={`${baseClasses} flex lg:hidden`}
      >
        <div className={lineClasses} />
        <Icon strokeWidth={1.5} />
        <span className="font-base text-sm">{label}</span>
      </Link>

      {/* Desktop */}
      <Link href={href} className={`${baseClasses} hidden lg:flex`}>
        <div className={lineClasses} />
        <Icon strokeWidth={1.5} />
        <span className="font-base text-sm">{label}</span>
      </Link>
    </>
  );
}
