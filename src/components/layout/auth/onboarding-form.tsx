"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadAvatar } from "@/app/lib/supabase/helper";
import supabaseClient from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import { InputForm, TextArea } from "@/components/ui/input";
import { profileSchema, ProfileSchema } from "@/utils/zod/schema";

export function OnboardingForm() {
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (errors.username) return;
    setStep(step + 1);
  };

  const prevStep = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const onSubmit = async (formData: ProfileSchema) => {
    if (formData) {
      try {
        const supabase = supabaseClient();
        const { data, error } = await supabase.auth.getUser();

        if (error) return console.log(error);
        let publicUrl = null;
        if (formData.avatar_url instanceof File) {
          publicUrl = await uploadAvatar(
            formData.avatar_url,
            data.user?.id as string,
          );
        }

        if (formData.username || formData.avatar_url) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              username: formData.username,
              fullname: formData.fullname,
              avatar_url: publicUrl,
              bio: formData.bio || null,
            })
            .eq("id", data.user?.id);

          if (updateError) return console.log(updateError);
          router.push("/");
        }
      } catch (error) {
        if ((error as any)?.digest?.includes("NEXT_REDIRECT")) throw error;
        console.log("gagal upload: ", error);
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="flex flex-col text-white">
          {step === 1 && (
            <div className="flex flex-col gap-10">
              <div>
                <InputForm
                  type="text"
                  label="Username *"
                  placeholder="Your username"
                  {...register("username", {
                    required: true,
                  })}
                  ref={(el) => {
                    register("username").ref(el);
                    inputRef.current = el;
                  }}
                />

                {errors.username && (
                  <p className="mt-2 text-xs text-red-500/80">
                    {errors.username?.message}
                  </p>
                )}
                <p className="mt-2 text-start text-xs text-white/60">
                  For now, username cannot be changed once created.
                </p>
              </div>
              <div>
                <hr className="mt-10 mb-5 border-white/30" />
                <div className="flex justify-end">
                  <button
                    onClick={nextStep}
                    disabled={errors.username ? true : false}
                    className="group font-base flex w-fit cursor-pointer items-center rounded-full bg-white/80 px-3 py-2 text-zinc-950 duration-200 ease-in-out hover:scale-x-105 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <span>Next</span>
                    <ChevronRight className="duration-200 ease-in-out group-hover:translate-x-2 group-disabled:translate-x-0" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col items-center">
                  <label className="h-32 w-32 cursor-pointer overflow-hidden">
                    <input
                      type="file"
                      className="hidden"
                      {...register("avatar_url", {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPreviewImage(URL.createObjectURL(file));
                            setValue("avatar_url", file || null);
                            trigger("avatar_url");
                          }
                        },
                      })}
                    />
                    <Image
                      src={previewImage || "/blank-image.png"}
                      alt="blank image"
                      width={100}
                      height={100}
                      className="h-full w-full rounded-full object-cover object-center"
                    />
                  </label>
                  {errors.avatar_url?.message && (
                    <p className="mt-2 text-xs text-red-500/80">
                      {String(errors.avatar_url.message)}
                    </p>
                  )}
                  <p className="mt-3 text-center text-xs text-white/60">
                    Upload your profile picture if you want
                  </p>
                </div>
                <div>
                  <InputForm
                    type="text"
                    label="Fullname *"
                    placeholder="Your name"
                    {...register("fullname", {
                      required: true,
                    })}
                  />
                  {errors.fullname && (
                    <p className="mt-2 text-xs text-red-500/80">
                      {String(errors.fullname?.message)}
                    </p>
                  )}
                </div>
                <div>
                  <TextArea
                    label="Bio"
                    {...register("bio", {
                      required: false,
                    })}
                  />
                  {errors.bio && (
                    <p className="mt-2 text-xs text-red-500/80">
                      {String(errors.bio.message)}
                    </p>
                  )}
                </div>
                <hr className="mt-10 border-white/30" />
                <div className="flex gap-5">
                  <button
                    onClick={prevStep}
                    className="group flex w-full cursor-pointer items-center"
                  >
                    <ChevronLeft className="duration-200 ease-in-out group-hover:-translate-x-1" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cursor-pointer rounded-lg bg-white/80 py-2 text-sm font-semibold text-zinc-950 hover:bg-white"
                  >
                    {isSubmitting ? "Loading..." : "Submit"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </form>
    </>
  );
}
