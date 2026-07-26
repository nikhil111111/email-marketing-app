"use client";

export default function DeleteAudienceModal({
  open,
  audience,
  loading,
  onClose,
  onConfirm,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold">
          Delete Audience
        </h2>

        <p className="text-zinc-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-white">
            {audience?.name}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-red-400">
          This action cannot be undone.
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-zinc-700 px-4 py-2 hover:bg-zinc-800 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}