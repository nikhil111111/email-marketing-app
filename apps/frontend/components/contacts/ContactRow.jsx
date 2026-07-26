"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function ContactRow({
  contact,
  onEdit,
  onDelete,
}) {
  return (
    <tr className="border-b border-zinc-800 hover:bg-zinc-900 transition-colors">
      <td className="px-6 py-4 font-medium">
        {contact.name}
      </td>

      <td className="px-6 py-4 text-zinc-400">
        {contact.email}
      </td>

      <td className="px-6 py-4">
        {contact.phone || "-"}
      </td>

      <td className="px-6 py-4">
        {contact.customFields?.company || "-"}
      </td>

      <td className="px-6 py-4">
        {contact.customFields?.designation || "-"}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(contact)}
            className="text-blue-500 hover:text-blue-400"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(contact)}
            className="text-red-500 hover:text-red-400"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}