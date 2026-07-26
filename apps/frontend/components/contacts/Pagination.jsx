"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  pagination,
  onPageChange,
}) {
  if (!pagination || pagination.totalPages <= 1) {
    return null;
  }

  const { page, totalPages } = pagination;

  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-zinc-400">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-zinc-800"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-zinc-800"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}