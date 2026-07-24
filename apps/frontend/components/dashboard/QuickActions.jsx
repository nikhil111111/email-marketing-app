"use client";

import Link from "next/link";
import {
  PlusCircle,
  Users,
  Layers3,
} from "lucide-react";

const actions = [
  {
    title: "New Campaign",
    description: "Create and send a new email campaign",
    href: "/campaigns/create",
    icon: PlusCircle,
  },
  {
    title: "Import Contacts",
    description: "Upload contacts using CSV",
    href: "/contacts/import",
    icon: Users,
  },
  {
    title: "Create Audience",
    description: "Segment contacts into audiences",
    href: "/audiences/create",
    icon: Layers3,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>
      </div>

      <div className="space-y-4 p-6">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-start gap-4 rounded-xl border border-zinc-800 p-4 transition hover:border-blue-600 hover:bg-zinc-800"
            >
              <div className="rounded-lg bg-blue-600/20 p-3">
                <Icon
                  className="text-blue-500"
                  size={20}
                />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-zinc-400">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}