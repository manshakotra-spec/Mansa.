import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.VUE_APP_GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export interface AIResponse {
  text: string;
  suggestions?: string[];
  commandType?: string;
}

export async function generateAIResponse(prompt: string): Promise<AIResponse> {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      text,
      suggestions: extractSuggestions(text),
      commandType: detectCommandType(prompt),
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to generate AI response');
  }
}

function extractSuggestions(text: string): string[] {
  const suggestions: string[] = [];
  const lines = text.split('\n');
  
  lines.forEach(line => {
    if (line.match(/^\d+\./)) {
      suggestions.push(line.replace(/^\d+\.\s*/, '').trim());
    }
  });

  return suggestions.slice(0, 5);
}

function detectCommandType(prompt: string): string {
  if (prompt.includes('workflow')) return 'workflow';
  if (prompt.includes('node')) return 'node';
  if (prompt.includes('query')) return 'query';
  return 'general';
}