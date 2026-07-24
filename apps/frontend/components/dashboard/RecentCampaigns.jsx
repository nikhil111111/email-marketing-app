"use client";

import { format } from "date-fns";

const badgeColors = {
  DRAFT: "bg-gray-700 text-gray-200",
  SCHEDULED: "bg-yellow-500/20 text-yellow-400",
  PROCESSING: "bg-blue-500/20 text-blue-400",
  SENT: "bg-green-500/20 text-green-400",
  FAILED: "bg-red-500/20 text-red-400",
};

export default function RecentCampaigns({ campaigns = [] }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900">
      <div className="border-b border-zinc-800 px-6 py-5">
        <h2 className="text-xl font-semibold text-white">
          Recent Campaigns
        </h2>
      </div>

      {campaigns.length === 0 ? (
        <div className="py-16 text-center text-zinc-500">
          No campaigns found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-zinc-800 text-sm text-zinc-400">
              <tr>
                <th className="px-6 py-4 text-left">Campaign</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Scheduled</th>
                <th className="px-6 py-4 text-left">Created</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-b border-zinc-800 hover:bg-zinc-800/40"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {campaign.name}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        badgeColors[campaign.status] ||
                        "bg-zinc-700 text-white"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {campaign.scheduledAt
                      ? format(
                          new Date(campaign.scheduledAt),
                          "dd MMM yyyy"
                        )
                      : "-"}
                  </td>

                  <td className="px-6 py-4 text-zinc-300">
                    {format(
                      new Date(campaign.createdAt),
                      "dd MMM yyyy"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}