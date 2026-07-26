"use client";

import { useEffect, useState } from "react";
import { getAudiences } from "@/services/audienceService";
import { sendTestEmail } from "@/services/campaignService";

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

  const [testEmail, setTestEmail] = useState("");
  const [sendingTest, setSendingTest] = useState(false);

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

  const handleSendTestEmail = async () => {
  if (!testEmail.trim()) {
    return alert("Enter test email");
  }

  try {
    setSendingTest(true);

    await sendTestEmail(
      initialValues.id,
      testEmail
    );

    alert("Test email sent successfully");
  } catch (error) {
    console.error(error);
    alert(
      error.response?.data?.message ||
      "Failed to send test email"
    );
  } finally {
    setSendingTest(false);
  }
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

      {initialValues?.id && (
  <div className="space-y-3 rounded-lg border border-zinc-700 p-4">
    <h3 className="font-medium">
      Send Test Email
    </h3>

    <input
      type="email"
      value={testEmail}
      onChange={(e) =>
        setTestEmail(e.target.value)
      }
      placeholder="Enter email address"
      className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
    />

    <button
      type="button"
      onClick={handleSendTestEmail}
      disabled={sendingTest}
      className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
    >
      {sendingTest
        ? "Sending..."
        : "Send Test Email"}
    </button>
  </div>
)}

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