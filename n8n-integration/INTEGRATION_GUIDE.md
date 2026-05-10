# N8N & Mansa AI Integration Guide

## Overview

This guide explains how the N8N workflow automation platform is integrated with your Mansa AI assistant.

## Architecture

```
┌─────────────────────────────────────┐
│   Mansa. Repository (Root)          │
│  (AI Assistant & N8N Integration)   │
└────────────────┬────────────────────┘
                 │
    ┌────────────┴────────────┐
    │                         │
┌───▼──────────────┐  ┌──────▼──────────────┐
│  packages/       │  │  n8n-integration/  │
│  editor-ui/      │  │  (Full N8N Stack)  │
│  ai-assistant/   │  │                    │
└──────────────────┘  │  - packages/       │
                      │  - scripts/        │
                      │  - docker-compose │
                      └────────────────────┘
```

## Key Components

### 1. AI Assistant (Mansa Root)
- Location: `packages/editor-ui/src/ai-assistant/`
- Functions: Chat interface, command parsing, memory management
- Technology: Vue 3, TypeScript, Gemini API

### 2. N8N Integration (Mansa n8n-integration/)
- Location: `n8n-integration/`
- Functions: Workflow automation, 400+ integrations
- Technology: Node.js, Express, TypeORM

## Integration Flow

```
User Input
    ↓
[ChatPanel.vue] (AI Assistant)
    ↓
[CommandParser.ts] (Parse intent)
    ↓
Decision Point
    ├─→ [GeminiService.ts] (AI Response)
    └─→ [N8N API] (Workflow Execution)
    ↓
[MemoryService.ts] (Store history)
    ↓
Response to User
```

## Setup Instructions

### Step 1: Install Root Dependencies

```bash
cd /path/to/Mansa.
pnpm install
```

### Step 2: Setup N8N Integration

```bash
cd n8n-integration
bash setup.sh
```

### Step 3: Configure Environment

**Root `.env.local`:**
```env
VUE_APP_GEMINI_API_KEY=sk-...
VUE_APP_API_URL=http://localhost:5678
```

**n8n-integration `.env`:**
```env
DB_TYPE=sqlite
N8N_USER=admin
N8N_PASSWORD=secure_password
VUE_APP_GEMINI_API_KEY=sk-...
```

### Step 4: Run Services

**Option A: Docker Compose (Recommended)**
```bash
cd n8n-integration
docker-compose up -d
```

**Option B: Local Development**
```bash
# Terminal 1: AI Assistant
cd /path/to/Mansa.
pnpm run dev

# Terminal 2: N8N
cd n8n-integration
pnpm run dev
```

## Using the Integration

### AI-Powered Workflow Generation

1. Open the Mansa AI Assistant (right sidebar)
2. Type a command: `"Create workflow to fetch data from API"`
3. The assistant:
   - Parses the intent
   - Generates workflow suggestions
   - Creates the workflow in N8N
   - Returns confirmation

### Command Examples

```
# Workflow Commands
"Create workflow Data Processing"
"Run workflow Email Sender"
"Update workflow name to New Name"

# Node Commands
"Add HTTP Request node"
"Configure JSON parser"
"Remove unused nodes"

# Query Commands
"Find all failed workflows"
"List available integrations"
"Search HTTP nodes"
```

## API Integration

### N8N API Endpoints

```typescript
// Get workflows
GET /api/v1/workflows

// Create workflow
POST /api/v1/workflows
{
  name: "My Workflow",
  nodes: [...],
  connections: {...}
}

// Execute workflow
POST /api/v1/workflows/{id}/execute

// Get nodes
GET /api/v1/node-types
```

### AI Assistant API

```typescript
// Send command
POST /api/ai-command
{
  message: "Create workflow...",
  context: {...}
}

// Get suggestions
GET /api/ai-suggestions?input=...

// Get history
GET /api/ai-history
```

## Customization

### Adding Custom Nodes

1. Create node in `n8n-integration/packages/nodes-base/nodes/`
2. Register in node registry
3. Restart N8N service

### Extending AI Commands

1. Edit `CommandParser.ts`
2. Add new command pattern
3. Handle in `GeminiService.ts`

### Custom Workflows

1. Create in N8N UI
2. Export as JSON
3. Store in `n8n-integration/workflows/`

## Troubleshooting

### Issue: API Connection Failed
```bash
# Check N8N is running
curl http://localhost:5678/api/v1/workflows

# Update API URL in .env
VUE_APP_API_URL=http://localhost:5678
```

### Issue: AI Responses are Generic
```bash
# Verify Gemini API key
echo $VUE_APP_GEMINI_API_KEY

# Check API quota and limits
```

### Issue: Workflows Not Executing
```bash
# Check N8N worker
pnpm run dev:worker

# Verify database connection
DB_TYPE=sqlite npm test
```

## Performance Optimization

### For Development
- Use SQLite for local testing
- Enable hot-reload: `pnpm run dev`
- Use Chrome DevTools for debugging

### For Production
- Switch to PostgreSQL: `DB_TYPE=postgresdb`
- Enable Redis caching: `REDIS_URL=redis://..`
- Use Docker for isolation
- Enable monitoring: `npm run build:docker:coverage`

## Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **API Keys**: Rotate Gemini API keys regularly
3. **Database**: Use strong passwords in production
4. **CORS**: Configure allowed origins
5. **JWT**: Use secure encryption keys

## Next Steps

1. ✅ Setup complete - follow Quick Start
2. Create your first workflow via AI
3. Customize nodes and integrations
4. Deploy to production

## Support

- **N8N Docs**: https://docs.n8n.io
- **Gemini API**: https://ai.google.dev
- **Repository**: https://github.com/manshakotra-spec/Mansa.

## License

This integration combines:
- **N8N**: Fair-code license
- **Mansa AI**: Custom license

See LICENSE files in respective directories.
