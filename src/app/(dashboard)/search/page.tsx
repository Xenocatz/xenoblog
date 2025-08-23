import { SearchBar } from "@/components/layout";

export default function Search() {
  return (
    <>
      <main>
        <div className="flex w-full flex-col items-center p-5">
          <div className="w-full lg:hidden">
            <SearchBar />
          </div>
          <div className="flex w-full py-5">
            <h3>Result:</h3>
          </div>
        </div>
      </main>
    </>
  );
}
