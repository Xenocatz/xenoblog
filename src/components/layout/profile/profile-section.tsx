import Image from "next/image";
import { supabaseServer } from "@/app/lib/supabase/server";
import { formatNumber } from "@/utils/format";
import { ButtonFollow } from "./button-follow";
import { ProfileError } from "./profile-error";
import { EditProfile } from "./edit-profile";

const bio =
  "Passionate blogger sharing insights on technology, coding, and personal growth.";

type ProfileSectionProps = {
  profile: {
    id: string;
    username: string;
    avatar_url: string;
    fullname: string;
    bio: string;
  };
};

export async function ProfileSection({ profile }: ProfileSectionProps) {
  const supabase = await supabaseServer();

  try {
    // get user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const [followersResult, followingResult] = await Promise.all([
      // get followers
      supabase
        .from("follows")
        .select("*", { count: "exact", head: true })
        .eq("following_id", profile?.id),

      // query cek apakah sudah follow
      supabase
        .from("follows")
        .select("id")
        .match({
          following_id: profile?.id,
          follower_id: user?.id,
        })
        .single(),
    ]);

    const { count } = followersResult;
    const { data: following } = followingResult;

    const isFollowing = Boolean(following?.id);
    const isOwner = user && profile ? user.id === profile.id : false;

    return (
      <section className="hidden w-1/3 border-l border-jet-500/30 lg:block">
        <div className="flex h-screen flex-col gap-5 px-5 pt-10 lg:px-10">
          <div className="relative h-28 w-28 overflow-hidden rounded-full">
            <Image
              src={profile?.avatar_url || "/blank-image.png"}
              alt="profile"
              fill
              className="object-cover object-center"
            />
          </div>
          <div>
            <h1 className="font-parkinsans text-xl">{profile?.fullname}</h1>
            <p className="text-sm text-jet-200">@{profile?.username}</p>
            <p className="mt-2 text-sm font-medium text-jet-100">
              {formatNumber((count as number) ?? 0)} Followers
            </p>
          </div>
          <p className="line-clamp-6 max-h-30 w-69 text-sm text-wrap text-jet-200">
            {profile?.bio || bio}
          </p>
          {!isOwner ? (
            <ButtonFollow
              userid={user?.id as string}
              otherid={profile?.id as string}
              isFollowing={isFollowing}
            />
          ) : (
            <EditProfile profile={profile} />
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.log("error");
    return (
      <>
        <ProfileError message="error fetching profile" />
      </>
    );
  }
}
