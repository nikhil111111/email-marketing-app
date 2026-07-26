"use client";

import {
    Pencil,
    Trash2,
    Copy,
    send,
    Send
} from "lucide-react";
import AttachmentUploader from "./AttachmentUploader";

const STATUS_STYLES = {
    draft: {
        bg: "bg-gray-500/20",
        text: "text-gray-300",
        label: "Draft",
    },
    scheduled: {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        label: "Scheduled",
    },
    processing: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        label: "Processing",
    },
    sent: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        label: "Sent",
    },
    failed: {
        bg: "bg-red-500/20",
        text: "text-red-400",
        label: "Failed",
    },
    queued: {
        bg: "bg-cyan-500/20",
        text: "text-cyan-400",
        label: "Queued",
    },
};

const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatFileSize = (bytes) => {
    if (!bytes) return "";

    if (bytes < 1024) return `${bytes} B`;

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export default function CampaignTable({
    campaigns,
    onEdit,
    onDelete,
    onDuplicate,
    onUploadAttachment,
    onSend
}) {
    if (!campaigns.length) {
        return (
            <div className="rounded-lg border border-dashed border-zinc-700 p-10 text-center text-zinc-400">
                No campaigns found.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-zinc-800">
            <table className="min-w-full">
                <thead className="bg-zinc-900">
                    <tr>
                        <th className="px-4 py-3 text-left">Campaign</th>
                        <th className="px-4 py-3 text-left">Audience</th>
                        <th className="px-4 py-3 text-left">Subject</th>
                        <th className="px-4 py-3 text-left">Status</th>
                        <th className="px-4 py-3 text-left">Created</th>
                        <th className="px-4 py-3 text-left">Attachment</th>
                        <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {campaigns.map((campaign) => {
                        const status =
                            STATUS_STYLES[campaign.status] ??
                            STATUS_STYLES.draft;

                        return (
                            <tr
                                key={campaign.id}
                                className="border-t border-zinc-800 hover:bg-zinc-900/50"
                            >
                                <td className="px-4 py-3 font-medium">
                                    {campaign.name}
                                </td>

                                <td className="px-4 py-3">
                                    {campaign.Audience?.name || "-"}
                                </td>

                                <td className="px-4 py-3">
                                    {campaign.subject}
                                </td>

                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${status.bg} ${status.text}`}
                                    >
                                        {status.label}
                                    </span>
                                </td>

                                <td className="px-4 py-3 whitespace-nowrap">
                                    {formatDate(campaign.createdAt)}
                                </td>

                                <td className="px-4 py-3">
                                    {campaign.attachmentName ? (
                                        <div
                                            className="max-w-[220px]"
                                            title={campaign.attachmentName}
                                        >
                                            <div className="truncate text-sm text-zinc-300">
                                                📎 {campaign.attachmentName}
                                            </div>

                                            <div className="text-xs text-zinc-500">
                                                {formatFileSize(
                                                    campaign.attachmentSize
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <span className="text-zinc-500">
                                            —
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-3">
                                    <div className="flex justify-center gap-2">
                                        <button
                                            onClick={() => onEdit(campaign)}
                                            className="rounded p-2 hover:bg-zinc-800"
                                            title="Edit Campaign"
                                        >
                                            <Pencil size={18} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                onDuplicate(campaign.id)
                                            }
                                            className="rounded p-2 hover:bg-zinc-800"
                                            title="Duplicate Campaign"
                                        >
                                            <Copy size={18} />
                                        </button>

                                        <AttachmentUploader
                                            campaign={campaign}
                                            onUploaded={onUploadAttachment}
                                        />

                                        <button
                                            onClick={() => onDelete(campaign)}
                                            className="rounded p-2 text-red-500 hover:bg-red-500/10"
                                            title="Delete Campaign"
                                        >
                                            <Trash2 size={18} />
                                        </button>

                                        <button
                                            onClick={() => onSend(campaign)}
                                            disabled={
                                                ["processing", "sent"].includes(campaign.status)
                                            }
                                            className="rounded p-2 text-blue-500 hover:bg-blue-500/10 disabled:cursor-not-allowed disabled:opacity-40"
                                            title="Send Campaign"
                                        >
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}