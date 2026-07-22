const { z } = require("zod");

const baseContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(255),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .optional()
    .nullable(),
});

const createContactSchema = baseContactSchema.passthrough();

const updateContactSchema = baseContactSchema
  .partial()
  .passthrough();

module.exports = {
  createContactSchema,
  updateContactSchema,
};