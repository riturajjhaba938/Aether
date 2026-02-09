const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateStudyMaterial = async (content) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are an advanced AI Study Coach named Aether. 
      Your goal is to synthesize the following educational content into a structured study guide.
      
      Input Text:
      "${content.substring(0, 20000)}" 
      (Truncated for safety, prioritize the beginning and key sections if possible)

      Output MUST be a valid JSON object with the following structure:
      {
        "summary": "A concise, 3-sentence summary of the core concepts.",
        "milestones": [
          { "timestamp": 120, "label": "Topic A" }, 
          // timestamps in seconds, estimated based on content flow if not explicit
        ],
        "quiz": [
          { 
            "question": "Sample Question based on the video?", 
            "options": ["A", "B", "C", "D"], 
            "answer": 0, // index of correct option
            "timestamp": 120 // timestamp (seconds) where the answer is explained
          }
        ]
      }
      
      Do not include markdown formatting like \`\`\`json. Just the raw JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown code blocks
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    return JSON.parse(cleanText);
  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      summary: "Could not generate summary at this time.",
      milestones: [],
      quiz: []
    };
  }
};
