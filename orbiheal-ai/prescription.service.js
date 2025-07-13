// prescription.service.js
import fetch, { FormData } from "node-fetch";

export const scanPrescriptionService = async (file) => {
    if (!file || !file.buffer) {
        throw new Error("No image file provided");
    }

    console.log("Preparing to upload:", {
        filename: file.originalname,
        size: (file.size / (1024 * 1024)).toFixed(2) + "MB",
        mimetype: file.mimetype,
    });

    const pythonServerUrl = `${process.env.ORBIHEAL_AI_URL}/prescription/ocr`;
    console.log("Uploading to:", pythonServerUrl);

    const formData = new FormData();
    formData.append("image", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
    });

    const response = await fetch(pythonServerUrl, {
        method: "POST",
        body: formData,
    });

    console.log("Response status:", response.status, response.statusText);

    const responseBody = await response.text(); // Read body once
    if (!response.ok) {
        console.error("OCR server error response:", responseBody);
        throw new Error(`OCR server error: ${response.status} ${response.statusText}`);
    }

    return JSON.parse(responseBody); // Parse JSON only if response is OK
};