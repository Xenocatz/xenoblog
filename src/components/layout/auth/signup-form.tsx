"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { signupSchema, type SignupSchema } from "@/utils/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import supabaseClient from "@/app/lib/supabase/client";
import { InputForm } from "@/components/ui/input";

export function SignupForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const onSubmit = async (formData: SignupSchema) => {
    if (formData.password !== formData.confirmPassword) return;
    if (formData.email && formData.password && formData.confirmPassword) {
      try {
        const supabase = supabaseClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
        });

        if (!error && user) {
          const { error: updateError } = await supabase
            .from("profiles")
            .insert({
              id: user.id,
              email: user.email,
            })
            .single();

          if (updateError) return console.log(updateError);
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
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
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <InputForm
            label="Confirm Password"
            placeholder="Password"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
          <p className="text-xs text-white/30">Enter your password again</p>
        </div>
        {/* button */}
        <button
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-lg bg-white/80 px-5 py-2 text-sm font-semibold text-zinc-900 hover:bg-white disabled:cursor-not-allowed disabled:bg-white/50 lg:text-base"
        >
          {isSubmitting ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </>
  );
}
