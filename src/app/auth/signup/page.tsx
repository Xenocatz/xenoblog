import { ButtonGoogleOAuth } from "@/ui/component/button";
import InputForm from "@/ui/component/input";
import { BtnTest } from "@/ui/test/test";
import { Metadata } from "next";
import { headers } from "next/headers";
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
      <BtnTest />
      <div className="flex w-full items-center gap-5">
        <hr className="w-full border-white/30" />
        <p className="text-sm text-white/30">or</p>
        <hr className="w-full border-white/30" />
      </div>

      {/* form */}
      <form className="flex w-full flex-col gap-3 lg:gap-4">
        <div className="flex gap-4 lg:gap-5">
          <InputForm
            name="Full name"
            placeholder="eg. Asep kadachi"
            type="text"
            autoComplete="name"
            required
          />
          <InputForm
            name="Username"
            placeholder="e.g Xenoid"
            type="text"
            autoComplete="off"
            required
          />
        </div>
        <InputForm
          name="Email"
          placeholder="eg. kaizen@example.com"
          type="email"
          autoComplete="email"
          required
        />
        <InputForm
          name="Password"
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          required
        />
        <p className="text-xs text-white/30">
          Password must be at least 6 characters
        </p>
        <InputForm
          name="Confirm Password"
          placeholder="Password"
          type="password"
          autoComplete="new-password"
          required
        />
        <p className="text-xs text-white/30">Enter your password again</p>
        {/* button */}
        <button className="w-full cursor-pointer rounded-lg bg-white/80 px-5 py-2 text-sm font-semibold text-zinc-900 hover:bg-white lg:text-base">
          Sign Up
        </button>
      </form>
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
