import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SINGLESTORE_URL: z.string(),
  },
  runtimeEnv: {
    SINGLESTORE_URL: process.env.SINGLESTORE_URL,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});