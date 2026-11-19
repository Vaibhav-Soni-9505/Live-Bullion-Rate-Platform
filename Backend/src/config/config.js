import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 8000,
  HB_SPOT_URL: process.env.HB_SPOT_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

if (!config.HB_SPOT_URL) {
  throw new Error("HB_SPOT_URL is missing from environment variables");
}

export default config;
