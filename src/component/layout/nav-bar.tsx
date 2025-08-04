import Image from "next/image";
import SearchBar from "../ui/search-bar";
import HamMenu from "../ui/hamMenu";
import SearchNav from "../ui/search-nav";

export default function Navbar() {
  return (
    <>
      <div className="sticky top-0 z-50 border-b border-zinc-900">
        <div className="flex items-center justify-between bg-zinc-950 px-5 py-2 text-white lg:px-8">
          <div className="flex flex-grow items-center gap-5">
            <HamMenu />
            <h1 className="font-parkinsans text-xl">
              Xeno<span className="font-semibold">Blog</span>
            </h1>
            {/* search bar */}
            <div className="hidden w-full lg:block">
              <SearchBar />
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* search icon */}
            <SearchNav />

            {/* button write */}
            <button className="hidden cursor-pointer rounded-lg border-2 border-green-800 px-5 py-2 font-parkinsans text-xs font-semibold text-white/90 duration-200 hover:border-green-500 hover:text-white lg:block">
              Write your story
            </button>

            {/* profile */}
            <div>
              <div className="cursor-pointer rounded-full border-2 border-white/30 duration-200 hover:border-white/50">
                <Image
                  src="/kucing pixel.jpg"
                  alt="profile"
                  width={50}
                  height={50}
                  className="h-9 w-9 rounded-full lg:h-10 lg:w-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
