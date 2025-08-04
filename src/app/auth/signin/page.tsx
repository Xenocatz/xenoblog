import { ButtonGoogleOAuth } from "@/component/ui/button";
import InputForm from "@/component/ui/input";
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
      <form className="flex w-full flex-col gap-3 lg:gap-4">
        <InputForm
          name="Email"
          placeholder="eg. kaizen@example.com"
          type="email"
          required
          autoComplete="email"
        />
        <InputForm
          name="Password"
          placeholder="enter your password"
          type="password"
          required
          autoComplete="password"
        />
        {/* button */}
        <button className="w-full cursor-pointer rounded-lg bg-white/80 px-5 py-2 text-sm font-semibold text-zinc-900 hover:bg-white lg:text-base">
          Sign In
        </button>
      </form>
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
