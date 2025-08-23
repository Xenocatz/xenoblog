import { supabaseServer } from "@/app/lib/supabase/server";
import { SearchBar } from "./search-bar";
import { SearchNav } from "./search-nav";
import { ButtonProfile } from "../profile";
import { HamMenu } from "./button-ham-Menu";
import { ButtonWriteYourStory } from "./button-write";
import { UserMenu } from "./user-menu";

export async function Navbar() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("fullname,username, avatar_url")
    .eq("id", user?.id)
    .single();

  const fullname = profile?.fullname;
  const slug = profile?.username;
  const profileImage = profile?.avatar_url || "/blank-image.png";

  return (
    <>
      <div className="sticky top-0 z-10 border-b border-zinc-900">
        <div className="flex items-center justify-between px-5 py-3 text-white lg:px-8">
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
            <ButtonWriteYourStory />

            <div className="relative">
              {/* profile */}
              <ButtonProfile profileImage={profileImage} />

              {/* user menu */}
              <UserMenu
                fullname={fullname}
                slug={slug}
                profileImage={profileImage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
