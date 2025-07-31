"use client";
import supabaseClient from "@/app/lib/supabase/client";

export const BtnTest = () => {
  const handleGetData = async () => {
    const { data } = await supabaseClient.auth.getUser();
    console.log("data: ", data);
  };

  return (
    <>
      <button
        onClick={handleGetData}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white/30 py-2 text-sm hover:bg-zinc-900 lg:text-base"
      >
        data
      </button>
      {/* <button
        formAction={logout}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-white/30 py-2 text-sm hover:bg-zinc-900 lg:text-base"
      >
        logout
      </button> */}
    </>
  );
};
