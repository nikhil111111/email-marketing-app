"use client";

export default function DeleteContactModal({
    open,
    contact,
    loading,
    onClose,
    onConfirm,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-zinc-900 p-6">
                <h2 className="text-xl font-semibold">
                    Delete Contact
                </h2>

                <p className="mt-4 text-zinc-400">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-white">
                        {contact?.name}
                    </span>
                    ?
                </p>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-zinc-700 px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}