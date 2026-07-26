"use client";

import ContactRow from "./ContactRow";

export default function ContactsTable({
  contacts,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950">
      <table className="min-w-full">
        <thead className="bg-zinc-900">
          <tr>
            <th className="px-6 py-4 text-left">Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Phone</th>
            <th className="px-6 py-4 text-left">Company</th>
            <th className="px-6 py-4 text-left">Designation</th>
            <th className="px-6 py-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <ContactRow
                key={contact.id}
                contact={contact}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-zinc-500"
              >
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}