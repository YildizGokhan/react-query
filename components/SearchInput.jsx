"use client";

export default function SearchInput({ search, setSearch }) {
  return (
    <input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Ara..."
      className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-2 rounded w-full mb-4 transition"
    />
  );
}
