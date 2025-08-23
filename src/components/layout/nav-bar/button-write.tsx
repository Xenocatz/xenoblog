import { SquarePen } from "lucide-react";
import Link from "next/link";

export const ButtonWriteYourStory = () => {
  return (
    <>
      <Link
        href={"/new-story"}
        className="hidden cursor-pointer items-center gap-2 rounded-lg border-2 border-red-soft/60 p-2 font-parkinsans text-xs font-semibold text-white/90 duration-200 hover:border-red-soft hover:text-white lg:flex"
      >
        <SquarePen strokeWidth={1.5} size={20} />
        <span>Write your story</span>
      </Link>
    </>
  );
};
