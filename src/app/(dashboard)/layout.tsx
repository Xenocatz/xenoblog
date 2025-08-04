import { SidebarProvider } from "@/component/context/side-bar-provider";
import Navbar from "@/component/layout/nav-bar";
import Sidebar from "@/component/layout/side-bar";
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
      <main className="h-screen font-poppins text-white">
        <SidebarProvider>
          <Navbar />
          <div className="flex h-full bg-zinc-950">
            <Sidebar />
            <div className="flex-grow transition-transform duration-200">
              {children}
            </div>
          </div>
        </SidebarProvider>
      </main>
    </>
  );
}
