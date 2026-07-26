"use client";

import { Plus, Search } from "lucide-react";

export default function CampaignToolbar({
  search,
  setSearch,
  onCreate,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-sm">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />

        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 py-2 pl-10 pr-4 outline-none focus:border-blue-500"
        />
      </div>

      <button
        onClick={onCreate}
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
      >
        <Plus size={18} />
        Create Campaign
      </button>
    </div>
  );
}