# N8n with Render-Ready AI Assistant

A powerful workflow automation platform enhanced with AI-powered assistant capabilities.

## Features

- 🤖 **AI Assistant**: Powered by Google Gemini for intelligent command generation
- 💬 **Chat Interface**: Interactive chat panel for natural language commands
- 💾 **Conversation Memory**: Persistent conversation history
- 🎯 **Smart Command Parsing**: Intelligent detection and validation of commands
- 📦 **400+ Integrations**: Full N8n integration ecosystem
- 🔧 **Self-hosted or Cloud**: Flexible deployment options

## Quick Start

### Installation

```bash
npm install
```

### Configuration

1. Copy `.env.example` to `.env.local`
2. Add your Gemini API key:

```env
VUE_APP_GEMINI_API_KEY=your_api_key_here
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## AI Assistant Usage

The AI assistant is integrated into the editor UI with the following capabilities:

### Command Types

- **Workflow Commands**: Create, update, delete, or run workflows
  - Example: "create workflow Data Processing"

- **Node Commands**: Add, remove, or configure workflow nodes
  - Example: "add node HTTP Request"

- **Query Commands**: Search and find resources
  - Example: "find all HTTP nodes"

## Project Structure

```
packages/
├── editor-ui/
│   └── src/
│       ├── ai-assistant/
│       │   ├── ChatPanel.vue          # Main chat interface
│       │   ├── GeminiService.ts       # Gemini API integration
│       │   ├── MemoryService.ts       # Conversation memory
│       │   └── CommandParser.ts       # Command parsing logic
│       └── App.vue                    # Main application
```

## Architecture

### ChatPanel.vue
The main Vue component that renders the AI assistant UI with a fixed sidebar.

### GeminiService.ts
Handles communication with Google Gemini API, processes prompts, and extracts suggestions.

### MemoryService.ts
Manages conversation history with localStorage persistence and context management.

### CommandParser.ts
Parses user input to detect command types and validate them against allowed patterns.

## API Integration

The assistant sends processed commands to `/api/ai-command` endpoint:

```typescript
{
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: userInput })
}
```

## License

Other (See N8n LICENSE)

## Contributing

Contributions welcome! Please follow the N8n contribution guidelines.
