"use client";

import { useEffect, useState } from "react";
import { getAudiences } from "@/services/audienceService";

export default function CampaignForm({
  initialValues,
  onSubmit,
  loading,
}) {
  const [audiences, setAudiences] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    audienceId: "",
    subject: "",
    htmlContent: "",
  });

  useEffect(() => {
    fetchAudiences();
  }, []);

  useEffect(() => {
    setFormData({
      name: initialValues?.name || "",
      audienceId: initialValues?.audienceId || "",
      subject: initialValues?.subject || "",
      htmlContent: initialValues?.htmlContent || "",
    });
  }, [initialValues]);

  const fetchAudiences = async () => {
    try {
      const response = await getAudiences();
      setAudiences(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Campaign Name
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter campaign name"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Audience
        </label>

        <select
          name="audienceId"
          value={formData.audienceId}
          onChange={handleChange}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-blue-500"
          required
        >
          <option value="">
            Select Audience
          </option>

          {audiences.map((audience) => (
            <option
              key={audience.id}
              value={audience.id}
            >
              {audience.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Subject
        </label>

        <input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Enter email subject"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium">
          Email Content
        </label>

        <textarea
          name="htmlContent"
          rows={10}
          value={formData.htmlContent}
          onChange={handleChange}
          placeholder="Write your email HTML here..."
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Campaign"}
      </button>
    </form>
  );
}