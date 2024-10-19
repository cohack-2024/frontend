const GEMINI_API_KEY = process.env.GEMINI_API;
const GEMINI_API_URL = process.env.GEMINI_ENDPOINT;

export const fetchGeminiResult = async (prompt: string) => {
  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  const response = await fetch(
    `${GEMINI_API_URL}/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );
  console.log(
    `${GEMINI_API_URL}/v1beta/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response}`);
  }

  return response.json();
};
