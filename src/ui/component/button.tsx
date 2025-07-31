"use client";
import { signInWithGoogle, signOut } from "@/actions/authActions";
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
  const handleSignOut = () => {
    signOut();
    router.push("/auth/signin");
    router.refresh();
  };

  return (
    <>
      <button
        onClick={handleSignOut}
        className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white/30 px-3 py-2 text-sm text-white hover:bg-zinc-900 lg:text-base"
      >
        Logout
      </button>
    </>
  );
};
