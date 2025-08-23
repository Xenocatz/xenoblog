"use client";

import { useState } from "react";
import supabaseClient from "@/app/lib/supabase/client";
import { UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

type ButtonFollowProps = {
  userid: string;
  otherid: string;
  isFollowing: boolean;
};

export function ButtonFollow({
  userid,
  otherid,
  isFollowing,
}: ButtonFollowProps) {
  const router = useRouter();
  const supabase = supabaseClient();
  const [following, setFollowing] = useState(isFollowing);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("follows").insert({
        follower_id: userid,
        following_id: otherid,
      });

      if (error) throw error;
      setFollowing(true);
      console.log("Follow successful");
    } catch (err) {
      console.error("Error following:", err);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  const handleUnfollow = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("follows").delete().match({
        follower_id: userid,
        following_id: otherid,
      });

      if (error) throw error;
      setFollowing(false);
      console.log("Unfollow successful");
    } catch (err) {
      console.error("Error unfollowing:", err);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <button
      onClick={following ? handleUnfollow : handleFollow}
      title={following ? "Unfollow" : "Follow"}
      disabled={loading}
      className={`flex w-fit cursor-pointer items-center gap-2 rounded-full border-2 border-jet-100/30 px-5 py-2 text-sm font-semibold duration-100 active:translate-0.5 ${
        following
          ? "bg-transparent hover:bg-jet-700"
          : "border-none bg-lime-500 text-jet-900 hover:bg-lime-600"
      } ${loading ? "cursor-not-allowed opacity-50" : ""}`}
    >
      {loading ? (
        <span>Loading...</span>
      ) : following ? (
        <>
          <UserCheck size={20} /> <span>Following</span>
        </>
      ) : (
        "Follow"
      )}
    </button>
  );
}
