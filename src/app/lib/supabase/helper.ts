import { formattedDate } from "@/utils/format";
import supabaseClient from "./client";

export const uploadAvatar = async (file: File, userId: string) => {
  const supabase = supabaseClient();
  const date = new Date();
  const formatedDate = formattedDate(date);
  const filePath = `${userId}/${formatedDate}_${file.name}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;
  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
  return data.publicUrl;
};

export const deleteAvatar = async (filePath: string) => {
  const supabase = supabaseClient();
  const { error } = await supabase.storage.from("avatars").remove([filePath]);
  if (error) throw error;
};

export const updateAvatar = async (
  userId: string,
  oldAvatar_url: string,
  file: File,
) => {
  // cek url
  if (oldAvatar_url) {
    const avatarPath = oldAvatar_url.split("avatars/").pop();

    // hapus avatar lama
    deleteAvatar(avatarPath as string);
  }
  // upload avatar baru
  const publicUrl = uploadAvatar(file, userId);
  // return public url
  return publicUrl;
};
