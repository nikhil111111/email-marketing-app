const { z } = require("zod");

const operators = [
  "equals",
  "notEquals",
  "contains",
  "startsWith",
  "endsWith",
];

const ruleSchema = z.object({
  field: z.string().trim().min(1),
  operator: z.enum(operators),
  value: z.any(),
});

const filtersSchema = z.object({
  condition: z.enum(["AND", "OR"]).default("AND"),
  rules: z.array(ruleSchema).default([]),
});

const createAudienceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Audience name must be at least 2 characters")
    .max(255),

  filters: filtersSchema,
});

const updateAudienceSchema = createAudienceSchema.partial();

module.exports = {
  createAudienceSchema,
  updateAudienceSchema,
};