"use client";

import { useState } from "react";

export default function ContactForm({
  initialValues,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    name: initialValues?.name || "",
    email: initialValues?.email || "",
    phone: initialValues?.phone || "",
    company: initialValues?.customFields?.company || "",
    designation: initialValues?.customFields?.designation || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
      />

      <input
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
      />

      <input
        name="designation"
        placeholder="Designation"
        value={formData.designation}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
      />

      <button
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 p-3 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Contact"}
      </button>
    </form>
  );
}