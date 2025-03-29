"use client";

import ToggleNavbar from "./ToggleNavbar";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow mb-4">
      <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        React Query CRUD
      </h1>
      <div className="flex items-center gap-4">
        <ToggleNavbar />
      </div>
    </nav>
  );
}
