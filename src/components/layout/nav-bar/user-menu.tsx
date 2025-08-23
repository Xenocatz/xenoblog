"use client";
import Image from "next/image";
import Link from "next/link";
import { useToggle } from "../../common/toggle-provider";
import { useEffect, useRef } from "react";
import { ButtonSignOut } from "../auth";

export function UserMenu({
  fullname,
  slug,
  profileImage,
}: {
  fullname: string;
  slug: string;
  profileImage: string;
}) {
  const { isUserMenuOpen, closeUserMenu } = useToggle();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        isUserMenuOpen
      ) {
        closeUserMenu();
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, closeUserMenu]);

  const handleMenuClick = () => {
    closeUserMenu();
  };

  return (
    <>
      {isUserMenuOpen && (
        <div className="absolute right-0" ref={menuRef}>
          <div className="flex w-43 flex-col items-center gap-3 rounded-lg bg-lightGray shadow shadow-white/30">
            {/* profile */}
            <Link href={`/profile/${slug}`} onClick={handleMenuClick}>
              <div className="group flex w-full cursor-pointer items-center gap-5 rounded-lg py-3">
                <Image
                  src={profileImage}
                  alt="profile"
                  width={50}
                  height={50}
                  className="h-14 w-14 rounded-full object-cover object-center brightness-95 select-none group-hover:brightness-100 lg:h-14 lg:w-14"
                />
                <div className="flex flex-col justify-between gap-2">
                  <div>
                    <h1 className="w-20 truncate text-base font-semibold text-white/80 group-hover:text-white">
                      {fullname}
                    </h1>
                    <p className="w-20 truncate text-xs text-white/60">
                      @{slug}
                    </p>
                  </div>
                  <p className="text-xs text-white/60 group-hover:text-white/80 group-hover:underline">
                    view profile
                  </p>
                </div>
              </div>
            </Link>

            {/* signout */}
            <div className="group flex w-full flex-col items-start justify-start gap-2 border-t border-white/10 px-3 py-3">
              <p className="text-sm text-white/60 group-hover:text-white/80">
                Sign Out
              </p>
              <ButtonSignOut />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
