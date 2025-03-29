"use client";

export default function Pagination({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
        className="p-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Önceki
      </button>
      <span className="p-2 text-gray-700 dark:text-gray-200">
        Sayfa {page} / {totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={page === totalPages}
        className="p-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded disabled:opacity-50 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
      >
        Sonraki
      </button>
    </div>
  );
}
