"use client";

import { useState } from "react";
import { contactSchema } from "@/lib/validators/contactValidator";

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
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "phone") {
      // Allow only digits
      updatedValue = value.replace(/\D/g, "");

      // Limit to 10 digits
      updatedValue = updatedValue.slice(0, 10);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
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
      {errors.name && (
        <p className="mt-1 text-sm text-red-500">
          {errors.name}
        </p>
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
        required
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-500">
          {errors.email}
        </p>
      )}

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