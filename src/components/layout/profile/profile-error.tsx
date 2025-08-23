import Image from "next/image";

export const ProfileError = ({ message }: { message: string }) => {
  return (
    <>
      {" "}
      <section className="w-1/3 border-l border-jet-500/30">
        <div className="flex h-screen flex-col gap-5 px-5 pt-10">
          <div className="relative h-28 w-28 overflow-hidden rounded-full">
            <Image
              src="/blank-image.png"
              alt="profile"
              fill
              className="object-cover object-center"
            />
          </div>
          <div>
            <h1 className="text-xl">{message}</h1>
          </div>
        </div>
      </section>
    </>
  );
};
