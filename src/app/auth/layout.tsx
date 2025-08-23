import Image from "next/image";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <div className="flex h-screen justify-center overflow-hidden pt-10 font-poppins lg:pl-30">
          {/* layout kiri */}
          <div className="bottom-0 m-auto hidden h-full w-full rounded-t-4xl bg-linear-to-t from-charcoal-100 from-20% via-emerald-700 via-60% to-lime-500 lg:block">
            <div className="flex h-full w-full flex-col items-center justify-end gap-5 py-20">
              <h2 className="flex items-center gap-2 font-parkinsans text-xl font-semibold">
                <Image src="/computer.png" alt="logo" width={50} height={50} />
                XenoBlog
              </h2>
              <div>
                <h1 className="text-center text-4xl font-bold">Welcome Back</h1>
                <p className="mt-5">
                  Write about your favorite topics here and share them with the
                  world
                </p>
              </div>
            </div>
          </div>

          {/* page kanan */}
          <div className="flex w-full flex-col items-center justify-center gap-5 px-6 lg:w-3/5 lg:justify-center lg:gap-8 lg:px-30">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
