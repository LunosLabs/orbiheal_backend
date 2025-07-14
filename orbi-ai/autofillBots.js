const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODE || "gemini-2.0-flash";


export const fetchGeminiBot = async (promptText) => {
  if (!promptText || typeof promptText !== "string") {
    throw new Error("promptText must be a non-empty string");
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        role: "user",
        parts: [
          { text: promptText }
        ]
      }
    ]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`Gemini API error ${response.status}: ${JSON.stringify(errorBody)}`);
  }

  return await response.json();
};
