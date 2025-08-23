import z from "zod";

const RESERVED_SLUGS = new Set([
  "admin",
  "root",
  "support",
  "api",
  "system",
  "null",
  "undefined",
  "new",
  "edit",
  "login",
  "signup",
  "me",
  "user",
]);

// profile
export const profileSchema = z.object({
  username: z
    .string()
    .lowercase({
      message: "Username must be lowercase",
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    })
    .min(3, { message: "Username must be at least 3 characters " })
    .max(20, { message: "Username must be at most 20 characters long" })
    .refine((username: string) => !RESERVED_SLUGS.has(username), {
      message: "Username is already reserved ",
    })
    .trim(),
  avatar_url: z
    .any()
    .optional()
    .superRefine((file, ctx) => {
      if (!(file instanceof File)) return;

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/svg+xml",
      ];

      if (!allowedTypes.includes(file.type)) {
        ctx.addIssue({
          code: "custom",
          message: "Avatar must be an image",
        });
      }

      if (file.size > 2 * 1024 * 1024) {
        ctx.addIssue({
          code: "custom",
          message: "Avatar size must be less than 2MB",
        });
      }
    }),
  fullname: z
    .string()
    .min(3, "Fullname must be at least 3 characters")
    .max(50, "Fullname must be at most 50 characters long")
    .trim(),
  bio: z
    .string()
    .max(200, "Bio must be at most 200 characters long")
    .trim()
    .optional(),
});
export type ProfileSchema = z.infer<typeof profileSchema>;

// Signup
export const signupSchema = z
  .object({
    email: z.email().trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .trim(),
    confirmPassword: z
      .string()
      .min(1, { message: " Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type SignupSchema = z.infer<typeof signupSchema>;

// Signin
export const signinSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(8, "Password must be at least 8 characters").trim(),
});

export type SigninSchema = z.infer<typeof signinSchema>;
