import { ButtonGoogleOAuth, SigninForm } from "@/components/layout";
import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <div className="flex flex-col items-center gap-3 lg:gap-5">
        <h1 className="font-parkinsans text-2xl font-semibold lg:text-3xl">
          Sign In Account
        </h1>
        <p className="text-center text-xs text-white/60 lg:text-sm">
          Sign in to your account and start writing your story
        </p>
      </div>
      <ButtonGoogleOAuth />
      <div className="flex w-full items-center gap-5">
        <hr className="w-full border-white/30" />
        <p className="text-sm text-white/30">or</p>
        <hr className="w-full border-white/30" />
      </div>
      {/* form */}
      <SigninForm />
      <p>
        <span className="text-xs text-white/60 lg:text-sm">
          Don&apos;t have an account?
        </span>{" "}
        <Link
          href="/auth/signup"
          className="text-xs hover:underline lg:text-sm"
        >
          Sign Up
        </Link>
      </p>
    </>
  );
}
