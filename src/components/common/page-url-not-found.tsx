import Link from "next/link";

export const PageUrlNotFound = () => {
  return (
    <>
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <h1 className="text-3xl font-semibold">
          Sorry, this page is not available
        </h1>
        <p>
          The link you followed may be broken, or the page may have been
          removed.
        </p>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Homepage
        </Link>
      </div>
    </>
  );
};
