import { ButtonSignOut } from "@/ui/component/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | XenoBlog",
  description:
    "Write about your favorite topics here and share them with the world",
};
export default function Dashboard() {
  return (
    <>
      <main>
        <div className="flex h-screen flex-col items-center justify-center bg-zinc-950">
          <h1 className="text-4xl font-bold text-white">Dashboard</h1>
          <ButtonSignOut />
        </div>
      </main>
    </>
  );
}
