"use client";
import Image from "next/image";
import { useToggle } from "../../common/toggle-provider";

export function ButtonProfile({ profileImage }: { profileImage: string }) {
  const { toggleUserMenu } = useToggle();
  return (
    <>
      <button onMouseDown={toggleUserMenu}>
        <div className="cursor-pointer rounded-full duration-200">
          <Image
            src={profileImage}
            alt="profile"
            width={50}
            height={50}
            className="h-9 w-9 rounded-full object-cover object-center select-none"
          />
        </div>
      </button>
    </>
  );
}
