import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <form className="flex w-full transform items-center gap-2 rounded-lg bg-zinc-900 px-3 py-2 transition-all duration-200 focus-within:ring-2 focus-within:ring-white/30 lg:max-w-xs lg:focus-within:max-w-xl">
      <button type="submit" className="flex cursor-pointer items-center">
        <Search strokeWidth={1.5} size={24} className="text-white/80" />
      </button>
      <input
        type="text"
        placeholder="Search..."
        className="w-full rounded-lg bg-zinc-900 text-sm outline-none"
      />
    </form>
  );
}
