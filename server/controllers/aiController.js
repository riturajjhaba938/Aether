const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AETHER_SYSTEM_PROMPT = `
You are the Aether Synthesis Engine. Ingest raw data from Transcripts and PDF text to fuse them into a structured, interactive learning experience.
Output MUST be STRICT JSON:
{
  "summary": "max 3 sentences",
  "knowledge_graph": [{"term": "string", "group": 1, "definition": "string", "relevance_score": 1-10}],
  "interactive_timeline": [{"timestamp": seconds, "label": "string", "deep_dive": "string"}],
  "quiz_bank": [{"question": "string", "options": ["string"], "answer": 0, "distractor_explanation": "string", "timestamp": seconds}],
  "the_gravity_shift": "ELI5 version of the hardest concept"
}
Key Requirements:
1. knowledge_graph should return nodes for a force-graph (term as id, group).
2. quiz_bank answer should be an index (0-3).
3. timestamps must be integers (seconds).
4. deep_dive in timeline should be a 1-sentence interesting fact.
`;

exports.generateAetherContent = async (content) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // Truncate content to avoid token limits for now, prioritizing start
    const truncatedContent = content.length > 30000 ? content.substring(0, 30000) : content;

    const prompt = `${AETHER_SYSTEM_PROMPT}\n\nCONTENT TO PROCESS:\n${truncatedContent}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Clean up potential markdown code blocks
    const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(text);
  } catch (error) {
    console.error("AI Synthesis Error:", error);
    return {
      summary: "AI Synthesis Failed. Please try again.",
      knowledge_graph: [],
      interactive_timeline: [],
      quiz_bank: [],
      the_gravity_shift: "Error processing content."
    };
  }
};
