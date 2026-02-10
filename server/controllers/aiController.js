const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AETHER_SYSTEM_PROMPT = `You are the Aether Synthesis Engine. Analyze this content and return ONLY valid JSON (no markdown, no backticks):
{
  "summary": "2-3 sentence summary",
  "knowledge_graph": [{"term": "concept name", "group": 1, "definition": "brief definition"}],
  "interactive_timeline": [{"timestamp": seconds_int, "label": "short label", "deep_dive": "1 sentence fact"}],
  "quiz_bank": [{"question": "q", "options": ["a","b","c","d"], "answer": 0}],
  "the_gravity_shift": "ELI5 of hardest concept"
}
Rules: knowledge_graph max 12 items. quiz_bank max 5 questions. timeline max 8 items. answer is index 0-3. Be concise.`;

// Helper: wait for ms
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.generateAetherContent = async (content) => {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 4096,
          responseMimeType: "application/json",
        }
      });

      // Trim content aggressively for speed
      const truncatedContent = content.length > 15000 ? content.substring(0, 15000) : content;
      const prompt = `${AETHER_SYSTEM_PROMPT}\n\nCONTENT:\n${truncatedContent}`;

      console.log(`[Aether AI] Attempt ${attempt}/${MAX_RETRIES} | Content: ${truncatedContent.length} chars`);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
      console.log('[Aether AI] Synthesis successful!');
      return JSON.parse(text);
    } catch (error) {
      console.error(`[Aether AI] Attempt ${attempt} failed:`, error.status, error.message?.substring(0, 100));

      if (error.status === 429 && attempt < MAX_RETRIES) {
        const waitTime = attempt * 60000;
        console.log(`[Aether AI] Rate limited. Waiting ${waitTime / 1000}s before retry...`);
        await sleep(waitTime);
        continue;
      }

      if (attempt === MAX_RETRIES) {
        console.error("[Aether AI] All retries exhausted.");
        return {
          summary: "AI Synthesis Failed. Please try again.",
          knowledge_graph: [],
          interactive_timeline: [],
          quiz_bank: [],
          the_gravity_shift: "Error processing content."
        };
      }
    }
  }
};
