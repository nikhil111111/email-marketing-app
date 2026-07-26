"use client";

export default function AudienceTable({
  audiences,
  onEdit,
  onDelete,
  onViewContacts,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      <table className="min-w-full">
        <thead className="bg-zinc-900">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold">
              Name
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Rules
            </th>

            <th className="px-6 py-3 text-left text-sm font-semibold">
              Created
            </th>

            <th className="px-6 py-3 text-center text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {audiences.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-10 text-center text-zinc-400"
              >
                No audiences found.
              </td>
            </tr>
          ) : (
            audiences.map((audience) => (
              <tr
                key={audience.id}
                className="border-t border-zinc-800 hover:bg-zinc-900/40"
              >
                <td className="px-6 py-4">
                  {audience.name}
                </td>

                <td className="px-6 py-4">
                  {audience.filters?.rules?.length || 0}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    audience.createdAt
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onViewContacts(audience)}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                    >
                      Contacts
                    </button>

                    <button
                      onClick={() => onEdit(audience)}
                      className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(audience)}
                      className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}