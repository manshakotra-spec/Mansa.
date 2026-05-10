import express, { Express, Request, Response } from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app: Express = express()
const PORT = process.env.PORT || 5678

// Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// AI Command endpoint
app.post('/api/ai-command', async (req: Request, res: Response) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    // Simple response - in production, this would call Gemini
    const response = `Processing: ${message}\n\nThis is a placeholder response. Connect to Gemini API for full functionality.`

    res.json({ response })
  } catch (error) {
    console.error('AI Command error:', error)
    res.status(500).json({ error: 'Failed to process command' })
  }
})

// Serve index.html for all other routes (SPA)
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Mansa. Server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})
