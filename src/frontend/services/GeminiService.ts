import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.VUE_APP_GEMINI_API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

export interface AIResponse {
  response: string
  suggestions?: string[]
  commandType?: string
  timestamp: number
}

export async function generateAIResponse(prompt: string): Promise<AIResponse> {
  try {
    const systemPrompt = `You are an AI assistant for workflow automation using N8N and Gemini.
    
Your role:
- Help users create and manage workflows
- Parse natural language commands into workflow specifications
- Suggest workflow improvements
- Answer questions about integrations and nodes

When users ask to create workflows, respond with:
1. A brief description of what will be created
2. The workflow steps
3. Any required configurations

Keep responses concise and actionable.`

    const result = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{ text: `${systemPrompt}\n\nUser request: ${prompt}` }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
        topP: 0.95,
        topK: 40,
      },
    })

    const response = await result.response
    const text = response.text()

    return {
      response: text,
      suggestions: extractSuggestions(text),
      commandType: detectCommandType(prompt),
      timestamp: Date.now(),
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    throw new Error('Failed to generate AI response')
  }
}

function extractSuggestions(text: string): string[] {
  const suggestions: string[] = []
  const lines = text.split('\n')
  
  lines.forEach(line => {
    if (line.match(/^\d+\.|^-|^\*/)) {
      const cleaned = line.replace(/^[\d+.-\\*]\s*/, '').trim()
      if (cleaned) suggestions.push(cleaned)
    }
  })

  return suggestions.slice(0, 5)
}

function detectCommandType(prompt: string): string {
  const lower = prompt.toLowerCase()
  if (lower.includes('workflow')) return 'workflow'
  if (lower.includes('node')) return 'node'
  if (lower.includes('integration')) return 'integration'
  if (lower.includes('run') || lower.includes('execute')) return 'execution'
  return 'general'
}
