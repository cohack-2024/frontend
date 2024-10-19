const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API;
const GEMINI_API_URL = process.env.REACT_APP_GEMINI_ENDPOINT;

const SYSTEM_INSTRUCTION = `You are a text-to-image generation expert. Whenever provided with text, generate an image prompt by focusing on key elements and themes, using a concise, comma-separated list of important keywords.`;
export const fetchGeminiResult = async (bookText: string) => {
  const requestBody = {
    system_instruction: {
      parts: {
        text: SYSTEM_INSTRUCTION,
      },
    },
    contents: {
      parts: {
        text: bookText,
      },
    },
    safetySettings: [
            {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_ONLY_HIGH"
            }
        ],
        generationConfig: {
            temperature: 1.0,
            maxOutputTokens: 75,
            topP: 0.8,
            topK: 10
        }
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

  if (!response.ok) {
    throw new Error(`Network response was not ok, status: ${response}`);
  }

  return response.json();
};
