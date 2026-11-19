import express from "express";
import cors from "cors";
import config from "./config/config.js";
import rateRouter from "./routes/rate.route.js";
import errorHandler from "./middlewares/error.middleware.js";
import { startGoldRateCache } from "./services/bullion.service.js";

const app = express();


startGoldRateCache();

const allowedOrigins = config.FRONTEND_URL
  ? config.FRONTEND_URL.split(",").map((origin) => origin.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as Postman.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin not allowed by CORS"));
    },
    methods: ["GET"],
  })
);

app.use(express.json());

app.use("/api/v1/rates", rateRouter);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});

// Keep error handler after routes
app.use(errorHandler);

export default app;
