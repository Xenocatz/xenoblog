import supabaseClient from "@/app/lib/supabase/client";

export const signInWithGoogle = async () => {
  const supabase = supabaseClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    console.error("Error logging in with Google: ", error.message);
  }
};

export const signOut = async () => {
  const supabase = supabaseClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("error sign out: ", error);
  }
};
