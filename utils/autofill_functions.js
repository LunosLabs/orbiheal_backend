export function extractValidJSONFromGeminiResponse(geminiResponse) {
  if (
    !geminiResponse ||
    !geminiResponse.candidates ||
    !geminiResponse.candidates[0] ||
    !geminiResponse.candidates[0].content ||
    !geminiResponse.candidates[0].content.parts ||
    !geminiResponse.candidates[0].content.parts[0] ||
    !geminiResponse.candidates[0].content.parts[0].text
  ) {
    throw new Error("Gemini response is missing expected text structure.");
  }

  let rawText = geminiResponse.candidates[0].content.parts[0].text.trim();

  // Remove ```json or ``` fencing if present
  if (rawText.startsWith("```")) {
    rawText = rawText.replace(/^```[^\n]*\n/, "").replace(/```$/, "").trim();
  }

  try {
    return JSON.parse(rawText);
  } catch (err) {
    throw new Error(`Invalid JSON returned by Gemini: ${err.message}`);
  }
}
