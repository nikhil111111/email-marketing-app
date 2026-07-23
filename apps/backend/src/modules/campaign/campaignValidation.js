const { z } = require("zod");

const attachmentSchema = {
  attachmentName: z.string().trim().optional(),
  attachmentPath: z.string().trim().optional(),
  attachmentMimeType: z.string().trim().optional(),
  attachmentSize: z.number().int().positive().optional(),
};

const campaignSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Campaign name is required"),

  audienceId: z
    .string()
    .uuid("Invalid audience ID"),

  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(255),

  htmlContent: z
    .string()
    .trim()
    .min(1, "Email content is required"),

  scheduledAt: z
    .string()
    .datetime()
    .optional()
    .or(z.null()),

  ...attachmentSchema,
});

const updateCampaignSchema = campaignSchema.partial();

module.exports = {
  campaignSchema,
  updateCampaignSchema,
};