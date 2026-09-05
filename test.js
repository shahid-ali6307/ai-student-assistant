import dotenv from 'dotenv';
import dns from 'node:dns';
import express from 'express';

dotenv.config();
dns.setDefaultResultOrder('ipv4first');

const router = express.Router();

router.post('/generate', async (req,res) => {
      const {mode,userInput} = req.body;

      if(!mode || !userInput) { 
         return res.status(400).json({ message : "both the data is required"}); 
      }

      try {
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
     const answer = data.candidates[0].content.parts[0].text;
     res.status(201).json({message : "the result has been fetched", result:answer});
     
    } catch(err) {
          return res.status(500).json({message : err.message});
      }
});

export default router;

// async function generateAIResponse(mode, userInput) {
//        const promptTemplates = {
//           explain: (input) => `You are an experienced university instructor.
//           Task: Explain the following concept to a beginner student.
//           Rules: Use simple language. Keep the explanation under 150 words.
//           Concept: ${input}`,

//           summarize: (input) => `You are a professional editor who writes concise summaries.
//           Task: Summarize the following text.
//           Rules: Output exactly 3-5 bullet points. Do not add information not present in the text.
//           Text: ${input}`,

//           improve: (input) => `You are a writing coach helping a student improve their academic writing.
//           Task: Rewrite the following text to improve clarity, grammar, and flow, while preserving meaning.
//           Rules: Return only the improved text, no explanation.
//           Text: ${input}`,

//           mcq: (input) => `You are an exam question generator.
//           Task: Generate 3-5 multiple-choice questions based on the following topic.
//           Rules: Each question must have exactly 4 options and one correct answer.
//           Output format: Respond ONLY with valid JSON, no markdown, in this exact shape:
//           { "questions": [ { "question": "string", "options": ["a","b","c","d"], "correctAnswer": "string" } ] }
//           Topic: ${input}`,
//         };
  
//         const structuredprompt = promptTemplates[mode](userInput);



//        const response = await fetch(
//          "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",
//        {
//           method: "POST",
//           headers: {
//              "Content-Type": "application/json",
//              "x-goog-api-key": process.env.GEMINI_API_KEY
//             },
//           body : JSON.stringify({
//             contents: [
//                 { parts: [ { text: structuredprompt } ] }
//             ]   
//           })
//       }
// );
//      const data = await response.json();
//      console.log(JSON.stringify(data, null, 2));
//      const answer = data.candidates[0].content.parts[0].text;
//      return answer;
// }
// console.log(await generateAIResponse("explain", "closures"));