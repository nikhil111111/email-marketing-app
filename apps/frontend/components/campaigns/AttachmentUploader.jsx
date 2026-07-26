"use client";

import { useRef } from "react";
import { Paperclip } from "lucide-react";
import { uploadAttachment } from "@/services/campaignService";

export default function AttachmentUploader({
  campaign,
  onUploaded,
}) {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const response = await uploadAttachment(file);

      onUploaded(campaign, response.data);

      e.target.value = "";
    } catch (error) {
      console.error(error);
      alert("Failed to upload attachment");
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="rounded p-2 hover:bg-zinc-800"
        title="Upload Attachment"
      >
        <Paperclip size={18} />
      </button>

      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
      />
    </>
  );
}