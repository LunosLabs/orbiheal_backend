import { promptTemplates } from "../utils/autofill_templates.js";
import { fetchGeminiBot } from "../orbi-ai/autofillBots.js";
import { extractValidJSONFromGeminiResponse } from "../utils/autofill_functions.js";

export const orbiAddNewMedicineService = async (entity, data) => {
  if (!entity || !data || typeof data !== "object") {
    throw new Error("Missig parameters");
  }

  const template = promptTemplates[entity];
  if (!template) {
    throw new Error(`No prompt template defined for entity: "${entity}"`);
  }

  const userJSON = JSON.stringify(data, null, 2);

  const finalPrompt = template.replace("{{USER_JSON}}", userJSON);

  const geminiResponse = await fetchGeminiBot(finalPrompt);

  const parsedData = extractValidJSONFromGeminiResponse(geminiResponse);

  return parsedData;
};
