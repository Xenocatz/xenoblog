import { ToggleProvider } from "@/components/common";
import { Navbar, Sidebar } from "@/components/layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | XenoBlog",
  description:
    "Write about your favorite topics here and share them with the world",
};
export default function Dashboard({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="h-screen overflow-hidden font-poppins">
        <ToggleProvider>
          <Navbar />
          <div className="flex h-full">
            <Sidebar />
            <div className="w-full">{children}</div>
          </div>
        </ToggleProvider>
      </main>
    </>
  );
}
