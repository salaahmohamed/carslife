"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterControls() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const clearFilters = () => {
    // Navigate to the same path but with no query params to clear filters
    router.push(window.location.pathname);
  };

  return (
    <div className="flex items-center mt-4 space-x-4">
      <button
        onClick={clearFilters}
        className="px-4 py-2 text-white transition bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Clear all filters"
        disabled={!searchParams.toString().length}
      >
        Clear Filters
      </button>
    </div>
  );
}
