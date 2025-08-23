import { supabaseServer } from "@/app/lib/supabase/server";
import { PageUrlNotFound } from "@/components/common";
import { ProfileSection } from "@/components/layout";

export default async function Profile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await supabaseServer();

  try {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id, username, fullname, bio, avatar_url")
      .eq("username", username)
      .single();

    if (error) throw error;

    return (
      <>
        <main>
          <div className="flex overflow-auto">
            {/* artikel user (on progress)*/}
            <section className="flex-grow">
              <div className="flex justify-center pt-20">
                <div className="flex w-3/5 flex-col gap-5">
                  <h1 className="font-parkinsans text-4xl">username</h1>
                  <hr className="w-full border-white/30" />
                  <div>article card list</div>
                </div>
              </div>
            </section>
            {/* detail profile */}
            <ProfileSection profile={profile} />
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error fetching profile:", error);
    return (
      <>
        <PageUrlNotFound />
      </>
    );
  }
}
