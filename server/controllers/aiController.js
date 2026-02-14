const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const AETHER_SYSTEM_PROMPT = `You are the Aether Synthesis Engine. Analyze content and return ONLY valid JSON:
{
  "summary": "2-3 sentence summary",
  "knowledge_graph": [{"term": "concept name", "group": 1, "definition": "brief definition"}],
  "interactive_timeline": [{"timestamp": seconds_int, "label": "short label", "deep_dive": "1 sentence fact"}],
  "quiz_bank": [{"question": "q", "options": ["a","b","c","d"], "answer": 0, "timestamp": seconds_int, "citation": "verbatim text snippet from doc"}],
  "the_gravity_shift": "ELI5 of hardest concept"
}
Rules: knowledge_graph max 12 items. quiz_bank max 5 questions. timeline max 8 items. answer is index 0-3. For PDFs, citation must be a unique 10-20 word verbatim snippet from the text that answers the question. Be concise.`;

// Helper: wait for ms
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

exports.generateAetherContent = async (content) => {
  const MAX_RETRIES = 3;

  // Check for Bytez API Key
  if (process.env.BYTEZ_API_KEY) {
    const Bytez = require("bytez.js");
    const client = new Bytez(process.env.BYTEZ_API_KEY);
    const model = client.model("Qwen/Qwen2.5-7B-Instruct");

    console.log("[Aether AI] Using Bytez (Qwen/Qwen2.5-7B-Instruct)...");

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        // ChatML format for Qwen
        // Use message array for Qwen/Bytez
        const messages = [
          { role: "system", content: AETHER_SYSTEM_PROMPT },
          { role: "user", content: `Analyze this content:\n${content.substring(0, 15000)}` }
        ];

        const result = await model.run(messages, {
          max_new_tokens: 4000,
          temperature: 0.3
        });

        // Handle Qwen response format (OpenAI-like)
        let text = "";
        console.log("[Aether AI] Raw Bytez Result keys:", Object.keys(result || {}));

        if (result && result.choices && result.choices[0] && result.choices[0].message) {
          text = result.choices[0].message.content;
        } else if (result && result.output) {
          // Qwen/Bytez returns { output: { role: 'assistant', content: '...' } }
          if (typeof result.output === 'object' && result.output.content) {
            text = result.output.content;
          } else {
            text = result.output;
          }
        } else {
          console.error("[Aether AI] Unexpected Bytez response:", JSON.stringify(result));
          throw new Error("Invalid response format from Bytez");
        }

        // Ensure text is a string before replacing
        if (typeof text !== 'string') {
          console.log("[Aether AI] Warning: response is not a string, converting:", typeof text);
          text = JSON.stringify(text);
        }

        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);

      } catch (error) {
        console.error(`[Aether AI] Bytez Attempt ${attempt} failed:`, error.message);
        if (attempt < MAX_RETRIES) await sleep(2000); // 2s wait for free tier
      }
    }
    // Fallback or failure if Bytez exhausted
    console.log("[Aether AI] Bytez exhausted, falling back to mock/error.");
  }

  // Fallback to Gemini if Bytez not configured or strictly failed (though here we return error if Bytez present)
  // Re-instantiate Gemini only if Bytez missing to avoid confusion, or keep as secondary?
  // User asked to use Bytez. Prioritizing it.

  if (!process.env.BYTEZ_API_KEY) {
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

        const truncatedContent = content.length > 15000 ? content.substring(0, 15000) : content;
        const prompt = `${AETHER_SYSTEM_PROMPT}\n\nCONTENT:\n${truncatedContent}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(text);
      } catch (error) {
        console.error(`[Aether AI] Gemini Attempt ${attempt} failed:`, error.status, error.message?.substring(0, 100));

        if (error.status === 429 && attempt < MAX_RETRIES) {
          const waitTime = attempt * 60000;
          console.log(`[Aether AI] Rate limited. Waiting ${waitTime / 1000}s before retry...`);
          await sleep(waitTime);
          continue;
        }
      }
    }
  }

  return {
    summary: "AI Synthesis Failed. Please try again.",
    knowledge_graph: [],
    interactive_timeline: [],
    quiz_bank: [],
    the_gravity_shift: "Error processing content."
  };
};

exports.chatWithSource = async (content, messages) => {
  // Basic context window management (last 10 messages + system prompt)
  const recentMessages = messages.slice(-10);

  // System Prompt for Chat
  const systemInstruction = `You are Aether, an expert AI study assistant. 
    User is studying the following content:
    ---
    ${content.substring(0, 10000)}... (truncated)
    ---
    Answer the user's questions based on this content. Be concise, helpful, and encouraging.
    If the answer is not in the content, say so but try to help based on general knowledge, clearly stating it's outside the source.`;

  // 1. Try Bytez (Qwen)
  if (process.env.BYTEZ_API_KEY) {
    try {
      const Bytez = require("bytez.js");
      const client = new Bytez(process.env.BYTEZ_API_KEY);
      const model = client.model("Qwen/Qwen2.5-7B-Instruct");

      // Construct Qwen-friendly message array
      const qwenMessages = [
        { role: "system", content: systemInstruction },
        ...recentMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      console.log("[Aether Chat] Sending to Bytez...");
      const result = await model.run(qwenMessages, {
        max_new_tokens: 1000,
        temperature: 0.7
      });

      // Parse response
      if (result && result.choices && result.choices[0]?.message?.content) {
        return result.choices[0].message.content;
      } else if (result && result.output) {
        if (typeof result.output === 'object' && result.output.content) {
          return result.output.content;
        } else if (typeof result.output === 'string') {
          return result.output;
        }
      }
      throw new Error("Invalid Bytez chat response");

    } catch (error) {
      console.error("[Aether Chat] Bytez failed:", error.message);
      // Fallback to Gemini
    }
  }

  // 2. Fallback to Gemini
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemInstruction }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to help you study this content." }],
        }
      ],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const lastMessage = recentMessages[recentMessages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    return response.text();

  } catch (error) {
    console.error("[Aether Chat] Gemini failed:", error.message);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};
