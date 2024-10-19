const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API;
const GEMINI_API_URL = process.env.REACT_APP_GEMINI_ENDPOINT;

const SYSTEM_INSTRUCTION = `You are a text-to-image generation expert. Whenever provided with text, generate an image prompt by focusing on key elements and themes, using a concise, comma-separated list of important keywords.`;

interface GeminiResponse {
    candidates: {
      content: {
        parts: {
          text: string;
        }[];
        role: string;
      };
      finishReason: string;
      index: number;
      safetyRatings: {
        category: string;
        probability: string;
      }[];
    }[];
    usageMetadata: {
      promptTokenCount: number;
      candidatesTokenCount: number;
      totalTokenCount: number;
    };
  }

export const fetchGeminiResult = async (bookText: string, system_inst: string = SYSTEM_INSTRUCTION , IS_SAFETY_ENABLE: boolean = true): Promise<GeminiResponse> => {
  const requestBody: any = {
    system_instruction: {
      parts: {
        text: system_inst,
      },
    },
    contents: {
      parts: {
        text: bookText,
      },
    },
    generationConfig: {
        temperature: 1.0,
        maxOutputTokens: 75,
        topP: 0.8,
        topK: 10
    }
  };

  if (IS_SAFETY_ENABLE) {
    requestBody.safetySettings = [
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH",
      },
    ];
  }

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
