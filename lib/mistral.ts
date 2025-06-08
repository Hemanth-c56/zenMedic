import axios from "axios";

/**
 * Sends a prompt to Mistral AI and returns the response
 * @param {string} apiKey - Your Mistral API key
 * @param {string} prompt - User input
 * @returns {Promise<string>} - Mistral's response
 */
async function runMistral(apiKey: string, prompt: string): Promise<string> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_MISTRAL_API_URL}` || "https://mistral.api",
      {
        model: "mistral-tiny", // or mistral-small, mistral-medium
        messages: [{ role: "user", content: prompt }],
        temperature: 0.9,
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Mistral API error:", {
      status: error?.response?.status,
      data: error?.response?.data,
    });
    return `Sorry, something went wrong while getting a response from Mistral. ${error}`;
  }
}

export default runMistral;
