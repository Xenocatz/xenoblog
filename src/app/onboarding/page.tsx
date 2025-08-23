import { OnboardingForm } from "@/components/layout";

export default function Onboarding() {
  return (
    <>
      <div className="flex h-screen items-center bg-zinc-950 font-poppins">
        <section className="flex w-full justify-center">
          <div className="flex flex-col items-start gap-10 rounded-lg bg-lightGray p-5 lg:w-2/6">
            <div>
              <h1 className="font-parkinsans text-xl text-white">
                Set up your profile
              </h1>
              <p className="text-center text-xs text-white/60">
                Set up your profile to start writing your story
              </p>
            </div>
            <OnboardingForm />
          </div>
        </section>
      </div>
    </>
  );
}
