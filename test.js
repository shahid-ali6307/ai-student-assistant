import dotenv from 'dotenv';
import dns from 'node:dns';
dotenv.config();
dns.setDefaultResultOrder('ipv4first');


const response = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.7-flash:generateContent",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": process.env.GEMINI_API_KEY
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: "Hello, tell me a joke"
            }
          ]
        }
      ]
    })
  }
);

const data = await response.json();

const answer = data.candidates[0].content.parts[0].text;

console.log(answer);