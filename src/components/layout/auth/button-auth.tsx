"use client";
import { signInWithGoogle, signOut } from "@/lib/actions/authActions";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const ButtonGoogleOAuth = () => {
  return (
    <>
      <button
        onClick={signInWithGoogle}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white/30 py-2 text-sm hover:bg-zinc-900 lg:text-base"
      >
        <div className="relative h-4 w-4 lg:h-5 lg:w-5">
          <Image
            src="/search (1).png"
            alt="Google Icon"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-semibold">Google</span>
      </button>
    </>
  );
};

export const ButtonSignOut = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/signin");
  };

  return (
    <>
      <button
        onClick={handleSignOut}
        className="flex h-9 w-28 cursor-pointer items-center justify-center gap-2 rounded-lg border-1 border-white/30 py-2 text-sm text-red-600/80 hover:text-red-500 lg:text-base"
      >
        <LogOut size={15} />
        <span className="text-sm font-semibold">Sign Out</span>
      </button>
    </>
  );
};
