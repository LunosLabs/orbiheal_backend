// prescription.service.js
import fetch, { FormData } from "node-fetch";

export const scanPrescriptionService = async (file) => {
    if (!file || !file.buffer) {
        throw new Error("No image file provided");
    }
    const pythonServerUrl = `${process.env.ORBIHEAL_AI_URL}/prescription/ocr`;

    const formData = new FormData();
    formData.append("image", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
    });

    const response = await fetch(pythonServerUrl, {
        method: "POST",
        body: formData,
    });

    const responseBody = await response.text(); // Read body once
    if (!response.ok) {
        throw new Error(`OCR server error: ${response.status} ${response.statusText}`);
    }

    return JSON.parse(responseBody); // Parse JSON only if response is OK
};