"use client";

export default function AudienceToolbar({
  search,
  onSearchChange,
  onAdd,
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="w-full md:max-w-sm">
        <input
          type="text"
          placeholder="Search audiences..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none transition focus:border-blue-500"
        />
      </div>

      <button
        onClick={onAdd}
        className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
      >
        + Add Audience
      </button>
    </div>
  );
}