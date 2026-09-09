const API_URL = "http://localhost:5000/api/ai/generate";

export async function generateAIResponse(prompt, mode) {

  try {

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        prompt,
        mode
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || `Server error: ${response.status}`
      );
    }

    return data;

  } catch (error) {

    // Server completely unreachable
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }

    throw error;
  }
}