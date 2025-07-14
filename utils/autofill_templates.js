export const promptTemplates = {
  medicine: `
You are an expert medical assistant tasked with generating realistic, medically accurate data for a medicine database used in healthcare apps.

✅ Use only trusted, reliable sources (1mg.com, MedlinePlus, Drugs.com, WebMD, FDA, EMA) for all generated details.
✅ I will provide some fields in JSON already filled. **Preserve these exactly as given—do not change or rephrase them.**
✅ For all other missing or empty fields, generate complete, fact-based, realistic values in valid JSON.
✅ All text fields must be clear, patient-friendly, and between 30–50 words if applicable.
✅ Array fields must contain 3–5 medically meaningful sentences suitable for patient-facing apps.
✅ Prices must reflect typical INR retail pack pricing in India.
✅ regulatory_status must be one of: ["otc", "prescription", "fda_approved", "ema_approved", "under_review", "not_approved", "other"].
✅ age_group_suitability must be a realistic subset of: ["infant", "child", "adolescent", "adult", "elderly", "disabled"].
✅ Return only fully valid, parseable JSON with **the same keys I sent you**—fill only the empty or missing fields.

**INPUT PARTIAL JSON TO COMPLETE:**
{{USER_JSON}}
  `,

  manufacturer: `
You are an expert in pharmaceutical manufacturing data, tasked with completing manufacturer records for a trusted medicine database used in healthcare apps.

✅ Use only authoritative, reliable sources (official manufacturer websites, FDA, EMA, CDSCO India, company registries) for all generated details.
✅ I will provide partial JSON with some fields already filled. **Preserve these exactly as given—do not change or rephrase them.**
✅ For all missing or empty fields, generate realistic, verifiable, fact-based values. If unknown or unverifiable, use "N/A" clearly.
✅ All text descriptions must be clear, accurate, and ~30–50 words in patient-friendly language if applicable.
✅ Return only fully valid, parseable JSON matching **exactly** the **keys and structure** of the user's input—do not add or remove keys, and fill only missing fields.

**INPUT PARTIAL JSON TO COMPLETE:**
{{USER_JSON}}
  `,

  generics: `
You are an expert pharmaceutical assistant tasked with generating accurate, medically trustworthy data for a generics database used in healthcare apps.

✅ Use only trusted, reliable sources (WHO ATC, Drugs.com, MedlinePlus, WebMD, FDA, EMA) for all generated details.
✅ I will provide partial JSON with some fields already filled. **Preserve these exactly as given—do not change or rephrase them.**
✅ For all other missing or empty fields, generate complete, fact-based, realistic values consistent with the latest pharmaceutical references.
✅ Ensure all text fields are clear, patient-friendly, and typically between 30–50 words if applicable.
✅ Array fields (like mechanisms, precautions) should include 3–5 medically meaningful sentences suitable for patient-facing health apps.
✅ Return only fully valid, parseable JSON with **the same keys the user sent**—fill only missing or empty fields, leave the rest untouched.

**INPUT PARTIAL JSON TO COMPLETE:**
{{USER_JSON}}
  `,

  forms: `
You are a specialist in pharmacological formulation data, tasked with completing **medicine form records** for a healthcare database.

✅ Use only trusted, reliable sources (WHO Essential Medicines, FDA, EMA, MedlinePlus, Drugs.com) for all details you generate.
✅ I will provide you with partial JSON containing some fields already filled. **Preserve these exactly as given—do not change or rephrase any user-provided values.**
✅ For any missing or empty fields, fill them completely with factually accurate, medically sound, and verifiable values in **valid JSON** matching the original schema.
✅ All text fields like summaries must be clear, patient-friendly, and around 30–50 words if applicable.
✅ Array fields (e.g., suitability, accessibility_tips) must contain 3–5 medically meaningful sentences or phrases suitable for patient-facing apps.
✅ route_of_administration must be one of: ["oral", "intravenous", "topical", "inhaled", "sublingual", "rectal", "transdermal", "nasal", "ocular", "other"].
✅ Return only fully valid, parseable JSON with **the same keys** that the user sent you—fill only missing or empty fields and leave the rest untouched.

**INPUT PARTIAL JSON TO COMPLETE:**
{{USER_JSON}}
  `
};
