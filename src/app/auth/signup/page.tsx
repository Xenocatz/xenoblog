import { ButtonGoogleOAuth, SignupForm } from "@/components/layout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up | XenoBlog",
  description:
    "Write about your favorite topics here and share them with the world",
};

export default async function SignUp() {
  return (
    <>
      <div className="flex flex-col items-center gap-3 lg:gap-5">
        <h1 className="font-parkinsans text-2xl font-semibold lg:text-3xl">
          Sign Up Account
        </h1>
        <p className="text-center text-xs text-white/60 lg:text-sm">
          Enter your personal information to create your account
        </p>
      </div>
      {/* button Google */}
      <ButtonGoogleOAuth />
      <div className="flex w-full items-center gap-5">
        <hr className="w-full border-white/30" />
        <p className="text-sm text-white/30">or</p>
        <hr className="w-full border-white/30" />
      </div>

      {/* form */}
      <SignupForm />
      <p>
        <span className="text-xs text-white/60 lg:text-sm">
          Already have an account?
        </span>{" "}
        <Link
          href="/auth/signin"
          className="text-xs hover:underline lg:text-sm"
        >
          Sign In
        </Link>
      </p>
    </>
  );
}
