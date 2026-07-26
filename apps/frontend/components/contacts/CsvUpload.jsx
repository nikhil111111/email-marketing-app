"use client";

import { useRef, useState } from "react";

export default function CsvUpload({ onUpload, loading }) {
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedFile(file);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    onUpload(selectedFile);

    setSelectedFile(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex items-center gap-2">
      <input
        ref={inputRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={() => inputRef.current?.click()}
        className="rounded-md border px-4 py-2 hover:bg-gray-100"
      >
        Choose CSV
      </button>

      {selectedFile && (
        <>
          <span className="text-sm text-gray-600">
            {selectedFile.name}
          </span>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>
        </>
      )}
    </div>
  );
}