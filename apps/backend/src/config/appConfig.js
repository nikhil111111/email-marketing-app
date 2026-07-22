const dotenv = require("dotenv");
const { z } = require("zod");

dotenv.config();

const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z.coerce.number().default(5000),
});

const parsedConfig = configSchema.safeParse(process.env);

if (!parsedConfig.success) {
  console.error("❌ Invalid environment configuration");
  console.error(parsedConfig.error.flatten().fieldErrors);
  process.exit(1);
}

module.exports = parsedConfig.data;