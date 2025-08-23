"use client";
import supabaseClient from "@/app/lib/supabase/client";
import { InputForm } from "@/components/ui";
import { signinSchema, SigninSchema } from "@/utils/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const SigninForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    mode: "onTouched",
  });

  const onSubmit = async (formData: SigninSchema) => {
    if (formData.email && formData.password) {
      try {
        const supabase = supabaseClient();
        const { error } = await supabase.auth.signInWithPassword(formData);
        if (error) throw error;
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-3 lg:gap-4"
    >
      <div className="flex flex-col gap-2">
        <InputForm
          label="Email"
          placeholder="eg. kaizen@example.com"
          type="email"
          autoComplete="email"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <InputForm
          label="Password"
          placeholder="enter your password"
          type="password"
          autoComplete="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className="text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>
      {/* button */}
      <button
        disabled={isSubmitting}
        className="w-full cursor-pointer rounded-lg bg-white/80 px-5 py-2 text-sm font-semibold text-zinc-900 duration-200 hover:bg-white active:translate-0.5 disabled:cursor-not-allowed lg:text-base"
      >
        {isSubmitting ? "Loading..." : "Sign In"}
      </button>
    </form>
  );
};
