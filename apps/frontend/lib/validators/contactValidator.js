import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z
  .string()
  .trim()
  .regex(/^[0-9]{10}$/, "Phone must be 10 digits")
  .or(z.literal("")),
  company: z.string().optional(),
  designation: z.string().optional(),
});