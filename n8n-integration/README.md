# N8N Integration

This directory contains the integrated n8n workflow automation platform with AI-powered assistant capabilities.

## Project Structure

```
n8n-integration/
├── packages/
│   ├── cli/                    # Main n8n CLI
│   ├── core/                   # Core n8n functionality
│   ├── editor-ui/              # Web editor interface
│   │   └── src/
│   │       └── ai-assistant/   # AI assistant components
│   ├── nodes-base/             # Built-in node integrations
│   └── workflow/               # Workflow engine
├── scripts/
│   ├── build.mjs              # Build script
│   └── setup.mjs              # Setup script
├── package.json               # Root package config
└── pnpm-workspace.yaml        # pnpm workspace config
```

## Features

- **400+ Built-in Integrations**: Out-of-the-box connectors
- **AI-Powered Assistant**: Gemini-based workflow suggestions
- **Visual Workflow Builder**: Drag-and-drop interface
- **Self-Hosted & Cloud**: Flexible deployment options
- **Custom Code Support**: JavaScript/Python workflows

## Quick Start

### Installation

```bash
# Install pnpm (required)
npm install -g pnpm@10.32.1

# Install dependencies
pnpm install

# Build the project
pnpm run build
```

### Development

```bash
# Start development server
pnpm run dev

# Run AI assistant development
pnpm run dev:ai

# Frontend only
pnpm run dev:fe

# Backend only
pnpm run dev:be
```

### Production

```bash
# Build for production
pnpm run build:n8n

# Start the server
pnpm start
```

## Testing

```bash
# Run all tests
pnpm run test

# Run specific test suite
pnpm run test:unit
pnpm run test:integration

# Run with Docker containers
pnpm run test:with:docker
```

## Docker Support

```bash
# Build Docker image
pnpm run build:docker

# With coverage
pnpm run build:docker:coverage

# With security scan
pnpm run build:docker:scan
```

## Requirements

- **Node.js**: >= 22.16
- **pnpm**: >= 10.22.0
- **Docker** (optional): For containerized deployment

## AI Assistant Integration

The AI assistant is integrated at `packages/editor-ui/src/ai-assistant/` with:

- **ChatPanel.vue**: Interactive UI component
- **GeminiService.ts**: API integration
- **MemoryService.ts**: Conversation history
- **CommandParser.ts**: Smart command detection

## Configuration

Create `.env.local` in the root:

```env
# Gemini API
VUE_APP_GEMINI_API_KEY=your_key_here

# Database
DB_TYPE=sqlite

# Feature Flags
VUE_APP_ENABLE_AI_ASSISTANT=true
```

## Documentation

- [N8N Official Docs](https://docs.n8n.io)
- [API Reference](./packages/cli/docs/api/)
- [Workflow SDK](./packages/workflow/)
- [Custom Nodes](./packages/nodes-base/)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

Fair-code license with Community License
