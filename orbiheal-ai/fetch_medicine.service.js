export const fetchNewMedicineService = async function (data) {
    const pythonServerUrl = `${process.env.ORBIHEAL_AI_URL}/medicine/gemini`;

    const response = await fetch(pythonServerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const err = new Error("Failed to fetch data from Gemini server");
        err.statusCode = response.status;
        throw err;
    }

    return await response.json();
};
