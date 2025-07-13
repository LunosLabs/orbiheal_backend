import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import medicineRoutes from "./routes/medicine.route.js";
import manufacturersRoutes from "./routes/manufacturer.route.js";
import genericRoutes from "./routes/generic.route.js";
import formRoutes from "./routes/form.route.js";
import userRoutes from "./routes/user.route.js";
import orbihealRoute from "./routes/orbiheal.route.js";
import prescriptionRoutes from "./routes/prescription.route.js";

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// --- Strict CORS: Allow only specific Vercel URL
const vercelRegex = new RegExp(process.env.VERCEL_ALLOWED_REGEX); // set in .env

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && vercelRegex.test(origin)) {
        return callback(null, true);
      }

      console.warn("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/medicine", medicineRoutes);
app.use("/api/v1/manufacturer", manufacturersRoutes);
app.use("/api/v1/generics", genericRoutes);
app.use("/api/v1/forms", formRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/orbi-ai", orbihealRoute);
app.use("/api/v1/prescription", prescriptionRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).json({
    error: err.message,
    details: err.details || undefined,
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
