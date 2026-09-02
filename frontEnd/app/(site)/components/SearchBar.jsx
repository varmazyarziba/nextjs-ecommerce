"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookSearchIcon, SearchIcon } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex items-center bg-white rounded-r px-5 py-2 w-full max-w-4xl"
    >
      <input
        type="text"
        placeholder="جستجوی محصولات"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-[#b7b7b7]/30 flex-1 outline-none border border-blue-600  p-3 rounded-full text-sm text-right"
      />
      <button
        type="submit"
        className=" relative left-[42px] w-[40px] h-[40px] 
        text-sm text-white bg-blue-600 px-3 py-2 rounded-full hover:bg-blue-700"
      >
        <SearchIcon size={22}  />
      </button>
    </form>
  );
}
