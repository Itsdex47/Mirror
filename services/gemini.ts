
import { GoogleGenAI } from "@google/genai";
import { Signal, Market } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSignalInsight = async (signal: Signal, markets: Market[]) => {
  if (!process.env.API_KEY) return "AI insights currently unavailable.";
  
  const marketContext = markets
    .map(m => `${m.title} on ${m.venue} (Price: ${m.yes_price})`)
    .join(', ');

  const prompt = `
    You are an expert market analyst for "Mirror". 
    Analyze the following market signal for a prediction market cluster.
    
    Signal Type: ${signal.type}
    Current Signal Explanation: ${signal.explanation}
    Related Markets: ${marketContext}
    
    Provide a concise (2-3 sentence) deeper explanation of why this signal represents an edge or inconsistency for a retail trader.
    Be calm, analytical, and professional.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 }
      }
    });
    return response.text || "Unable to generate deeper insight at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Insights unavailable.";
  }
};
