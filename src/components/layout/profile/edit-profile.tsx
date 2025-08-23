"use client";
import supabaseClient from "@/app/lib/supabase/client";
import { updateAvatar } from "@/app/lib/supabase/helper";
import { Button, InputForm, Modal, TextArea } from "@/components/ui";
import { profileSchema, ProfileSchema } from "@/utils/zod/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface Props {
  profile: {
    id: string;
    username: string;
    avatar_url: string;
    fullname: string;
    bio: string;
  };
}
export const EditProfile = ({ profile }: Props) => {
  const [iOpen, setOpen] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      avatar_url: null,
    },
  });

  const handleClose = () => {
    reset();
    setPreview(null);
    setOpen(false);
  };

  const handleOpen = () => setOpen(true);

  const handleDelete = () => {
    resetField("avatar_url");
    setPreview(null);
  };

  const onSubmit = async (data: ProfileSchema) => {
    console.log(data);
    try {
      toast.loading("Updating profile", { id: "profile" });
      const supabase = supabaseClient();
      // update avatar dulu
      let publicUrl;
      if (data.avatar_url) {
        publicUrl = await updateAvatar(
          profile.id,
          profile.avatar_url,
          data.avatar_url,
        );
      }
      // // update tabel profiles
      const { error } = await supabase
        .from("profiles")
        .update({
          fullname: data?.fullname,
          bio: data?.bio,
          avatar_url: publicUrl || profile.avatar_url || null,
        })
        .eq("id", profile.id);
      if (error) throw error;
      router.refresh();
      toast.success("Profile updated successfully", { id: "profile" });
      handleClose();
    } catch (error) {
      toast.error("Failed to update profile", { id: "profile" });
    }
  };
  return (
    <>
      <Button onClick={handleOpen} variant="secondary">
        <Pencil size={15} strokeWidth={1.5} />
        <span>Edit Profile</span>
      </Button>
      <Modal open={iOpen} onClose={handleClose}>
        <div>
          <h1 className="text-center font-parkinsans text-xl font-semibold">
            Profile Information
          </h1>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-5 lg:gap-10">
                {/* profile image */}
                <div className="flex items-center gap-5">
                  <label className="w-fit cursor-pointer overflow-hidden">
                    <span className="text-sm">Photo</span>
                    <input
                      type="file"
                      className="hidden"
                      {...register("avatar_url", {
                        onChange: (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setValue("avatar_url", file);
                            const url = URL.createObjectURL(file);
                            setPreview(url);
                            trigger("avatar_url");
                          }
                        },
                      })}
                    />
                    <Image
                      src={preview || profile.avatar_url || "/blank-image.png"}
                      alt="profile image"
                      width={100}
                      height={100}
                      className="size-[100px] rounded-full object-cover object-center select-none"
                    />
                  </label>
                  <div>
                    {/* delete */}
                    <button
                      type="button"
                      onClick={handleDelete}
                      title="Delete"
                      className="flex cursor-pointer items-center gap-1 rounded-full border-1 border-red-soft/60 px-2 py-1 text-sm text-red-soft duration-200 hover:text-red-500 active:translate-0.5"
                    >
                      <Trash2 size={15} strokeWidth={1.5} />
                      <span>Delete</span>
                    </button>
                    {errors.avatar_url && (
                      <p className="text-xs text-red-soft">
                        {errors.avatar_url.message as string}
                      </p>
                    )}
                  </div>
                </div>
                {/* username */}
                <div className="flex flex-col gap-2">
                  <InputForm
                    type="text"
                    label="username"
                    {...register("username", { disabled: true })}
                    defaultValue={profile.username}
                  />
                  <p className="text-xs text-jet-50/60">
                    username cannot be changed
                  </p>
                </div>
                {/* fullname */}
                <div className="flex flex-col gap-2">
                  <InputForm
                    type="text"
                    label="Fullname"
                    {...register("fullname")}
                    defaultValue={profile.fullname}
                  />
                  {errors.fullname && (
                    <p className="text-xs text-red-soft">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
                {/* bio */}
                <div>
                  <TextArea
                    label="Bio"
                    defaultValue={profile.bio}
                    {...register("bio")}
                  />
                  {errors.bio && (
                    <p className="text-xs text-red-soft">
                      {errors.bio.message}
                    </p>
                  )}
                </div>

                {/* button */}
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    onClick={handleClose}
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                  <Button disabled={isSubmitting} variant="primary">
                    {isSubmitting ? "Saving..." : "Save"}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
