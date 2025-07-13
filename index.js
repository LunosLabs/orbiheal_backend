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

// --- Load environment
dotenv.config();

// --- Initialize app
const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// --- Compile Vercel regex from .env
const vercelRegex = new RegExp(process.env.VERCEL_ALLOWED_REGEX);

// --- CORS middleware
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) {
                // Server-to-server, curl, Postman
                return callback(null, true);
            }

            if (vercelRegex.test(origin)) {
                // Vercel domain matches
                return callback(null, true);
            }

            console.warn("Blocked by CORS:", origin);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

// --- Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Routes
app.use("/api/v1/medicine", medicineRoutes);
app.use("/api/v1/manufacturer", manufacturersRoutes);
app.use("/api/v1/generics", genericRoutes);
app.use("/api/v1/forms", formRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/orbi-ai", orbihealRoute);
app.use("/api/v1/prescription", prescriptionRoutes);

// --- Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        error: err.message,
        details: err.details || undefined,
    });
});

// --- Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
