"use client";

import { useEffect, useState } from "react";

const FIELD_CONFIG = {
  name: {
    label: "Name",
    operators: [
      "equals",
      "notEquals",
      "contains",
      "startsWith",
      "endsWith",
    ],
  },

  email: {
    label: "Email",
    operators: [
      "equals",
      "notEquals",
      "contains",
      "startsWith",
      "endsWith",
    ],
  },

  phone: {
    label: "Phone",
    operators: [
      "equals",
      "notEquals",
      "startsWith",
      "endsWith",
    ],
  },

  city: {
    label: "City",
    operators: [
      "equals",
      "notEquals",
      "contains",
    ],
  },

  company: {
    label: "Company",
    operators: [
      "equals",
      "notEquals",
      "contains",
    ],
  },

  designation: {
    label: "Designation",
    operators: [
      "equals",
      "notEquals",
      "contains",
    ],
  },

  tags: {
    label: "Tags",
    operators: [
      "contains",
      "equals",
    ],
  },
};

const OPERATOR_LABELS = {
  equals: "Equals",
  notEquals: "Not Equals",
  contains: "Contains",
  startsWith: "Starts With",
  endsWith: "Ends With",
};
const createEmptyRule = () => ({
  field: "",
  operator: "equals",
  value: "",
});

export default function AudienceForm({
  initialValues,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    name: "",
    filters: {
      condition: "AND",
      rules: [],
    },
  });

  useEffect(() => {
    setFormData({
      name: initialValues?.name || "",
      filters: {
        condition:
          initialValues?.filters?.condition || "AND",
        rules:
          initialValues?.filters?.rules || [],
      },
    });
  }, [initialValues]);

  const handleNameChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleConditionChange = (condition) => {
    setFormData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        condition,
      },
    }));
  };

  const addRule = () => {
    setFormData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        rules: [
          ...prev.filters.rules,
          createEmptyRule(),
        ],
      },
    }));
  };

  const updateRule = (index, key, value) => {
    const rules = [...formData.filters.rules];

    rules[index] = {
      ...rules[index],
      [key]: value,
    };

    setFormData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        rules,
      },
    }));
  };

  const removeRule = (index) => {
    setFormData((prev) => ({
      ...prev,
      filters: {
        ...prev.filters,
        rules: prev.filters.rules.filter(
          (_, i) => i !== index
        ),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const invalidRule = formData.filters.rules.some(
      (rule) =>
        !rule.field.trim() ||
        !rule.operator.trim() ||
        !rule.value.trim()
    );

    if (invalidRule) {
      alert("Please complete all rules.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium">
          Audience Name
        </label>

        <input
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter audience name"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3 outline-none focus:border-blue-500"
          required
        />
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium">
          Condition
        </label>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={
                formData.filters.condition === "AND"
              }
              onChange={() =>
                handleConditionChange("AND")
              }
            />
            AND
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={
                formData.filters.condition === "OR"
              }
              onChange={() =>
                handleConditionChange("OR")
              }
            />
            OR
          </label>
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-medium">
            Rules
          </h3>

          <button
            type="button"
            onClick={addRule}
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
          >
            + Add Rule
          </button>
        </div>

        <div className="space-y-3">
          {formData.filters.rules.length === 0 && (
            <div className="rounded-lg border border-dashed border-zinc-700 p-6 text-center text-sm text-zinc-400">
              No rules added.
              <br />
              This audience will include all contacts.
            </div>
          )}

          {formData.filters.rules.map(
            (rule, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-3"
              >
                <select
                  value={rule.field}
                  onChange={(e) =>
                    updateRule(
                      index,
                      "field",
                      e.target.value
                    )
                  }
                  className="col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                >
                  <option value="">
                    Select Field
                  </option>

                  {Object.entries(FIELD_CONFIG).map(
                    ([value, config]) => (
                      <option
                        key={value}
                        value={value}
                      >
                        {config.label}
                      </option>
                    )
                  )}
                </select>

                <select
                  value={rule.operator}
                  onChange={(e) =>
                    updateRule(
                      index,
                      "operator",
                      e.target.value
                    )
                  }
                  className="col-span-3 rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                >
                  {(
                    FIELD_CONFIG[rule.field]?.operators || []
                  ).map((operator) => (
                    <option
                      key={operator}
                      value={operator}
                    >
                      {OPERATOR_LABELS[operator]}
                    </option>
                  ))}
                </select>

                <input
                  value={rule.value}
                  onChange={(e) =>
                    updateRule(
                      index,
                      "value",
                      e.target.value
                    )
                  }
                  placeholder="Value"
                  className="col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-3"
                />

                <button
                  type="button"
                  onClick={() =>
                    removeRule(index)
                  }
                  className="col-span-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
            )
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Save Audience"}
      </button>
    </form>
  );
}