"use client";

import { Plus, Upload } from "lucide-react";

export default function ContactToolbar({
  search,
  onSearchChange,
  onAdd,
  onImport,
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:w-80">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none focus:border-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={onImport}
          className="flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800"
        >
          <Upload size={18} />
          Import CSV
        </button>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Contact
        </button>
      </div>
    </div>
  );
}