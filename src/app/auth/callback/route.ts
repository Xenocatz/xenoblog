import { supabaseAdmin } from "@/app/lib/supabase/admin";
import { supabaseServer } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/dashboard";
  }

  if (code) {
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (user && user.id && !userError) {
        const supaAdmin = await supabaseAdmin();
        // add user ke supabase
        const userData = user.user_metadata;
        const { error } = await supaAdmin
          .from("profiles")
          .upsert(
            {
              id: user.id,
              email: user.email,
              username: userData.name || "guest",
              fullname: userData.full_name || userData.name || "",
              avatar_url: userData.avatar_url,
            },
            {
              onConflict: "id",
            },
          )
          .single();
        if (error) {
          console.error("gagal insert user", error);
        }
      }

      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
