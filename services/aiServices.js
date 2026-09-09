import dotenv from 'dotenv';
import dns from 'node:dns';

dotenv.config();
dns.setDefaultResultOrder('ipv4first');

async function generateAIResponse(mode, userInput) {
       const promptTemplates = {
          explain: (input) => `You are an experienced university instructor.
          Task: Explain the following concept to a beginner student.
          Rules: Use simple language. Keep the explanation under 150 words.
          Concept: ${input}`,

          summarize: (input) => `You are a professional editor who writes concise summaries.
          Task: Summarize the following text.
          Rules: Output exactly 3-5 bullet points. Do not add information not present in the text.
          Text: ${input}`,

          improve: (input) => `You are a writing coach helping a student improve their academic writing.
          Task: Rewrite the following text to improve clarity, grammar, and flow, while preserving meaning.
          Rules: Return only the improved text, no explanation.
          Text: ${input}`,

          mcq: (input) => `You are an exam question generator.
          Task: Generate 3-5 multiple-choice questions based on the following topic.
          Rules: Each question must have exactly 4 options and one correct answer.
          Output format: Respond ONLY with valid JSON, no markdown, in this exact shape:
          { "questions": [ { "question": "string", "options": ["a","b","c","d"], "correctAnswer": "string" } ] }
          Topic: ${input}`,
        };
  
        const structuredprompt = promptTemplates[mode](userInput);



       const response = await fetch(
         "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",
       {
          method: "POST",
          headers: {
             "Content-Type": "application/json",
             "x-goog-api-key": process.env.GEMINI_API_KEY
            },
          body : JSON.stringify({
            contents: [
                { parts: [ { text: structuredprompt } ] }
            ]   
          })
      }
);
     const data = await response.json();

     if (!response.ok) {
        console.error("Gemini API Error:", data);

        throw new Error(
           data?.error?.message ||
          `Gemini API request failed with status ${response.status}`
        );
      }


      if (!data?.candidates?.length) {
         console.error("Unexpected Gemini response:", data);

         throw new Error("Gemini returned no candidates.");
      }

     const answer = data.candidates[0].content.parts[0].text;
      if (!answer) {
         console.error("Unexpected Gemini response:", data);

         throw new Error("Gemini returned an empty response.");
      }

     return answer;
}

export default generateAIResponse;