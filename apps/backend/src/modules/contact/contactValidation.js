const { z } = require("zod");

const createContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(100),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .optional(),

  status: z
    .enum(["subscribed", "unsubscribed"])
    .optional(),
});

const updateContactSchema = createContactSchema.partial();

module.exports = {
  createContactSchema,
  updateContactSchema,
};