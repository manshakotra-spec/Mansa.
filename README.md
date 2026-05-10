# Mansa. - AI-Powered N8N Workflow Automation

> Production-ready deployment configuration for Render, Railway, Heroku, and cloud platforms

## 🚀 Quick Deploy

### Render.com (Recommended)

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/manshakotra-spec/Mansa.)

```bash
# One-click deploy via render.yaml
```

### Railway.app

```bash
# Deploy from CLI
railway link
railway up
```

### Heroku

```bash
# Deploy from CLI
heroku create mansa-app
git push heroku main
```

## 📋 System Requirements

- **Node.js**: >= 22.16
- **npm/pnpm**: >= 10.22.0
- **RAM**: 2GB minimum (4GB recommended)
- **Storage**: 5GB minimum

## 📦 Architecture

```
mansa. (Single Process)
├── Frontend (Vue 3 + Vite)
│   ├── AI Chat Panel
│   └── N8N Editor UI
├── Backend (Node.js + Express)
│   ├── AI API Routes
│   ├── N8N Integration
│   └── Workflow Engine
└── Database
    └── SQLite (Built-in) or PostgreSQL
```

## 🔧 Environment Variables

Create `.env` in production:

```env
# Port Configuration
PORT=5678
NODE_ENV=production

# Database
DB_TYPE=sqlite
DB_SQLITE_DATABASE_FILE=/tmp/n8n.db

# or PostgreSQL
# DB_TYPE=postgresdb
# DB_POSTGRESDB_HOST=your-db-host
# DB_POSTGRESDB_USER=postgres
# DB_POSTGRESDB_PASSWORD=password
# DB_POSTGRESDB_DATABASE=n8n

# AI Configuration
VUE_APP_GEMINI_API_KEY=your_gemini_key
VUE_APP_ENABLE_AI_ASSISTANT=true

# N8N Configuration
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=${RANDOM_PASSWORD}

# Security
ENCRYPTION_KEY=generate-strong-key
JWT_SECRET=generate-strong-secret

# Feature Flags
FEATURE_FLAGS_n8n_aigeneration=true
FEATURE_FLAGS_workflowHistory=true
FEATURE_FLAGS_debugInEditor=true

# Logging
N8N_LOG_LEVEL=info
LOG_OUTPUT=file
LOG_FILE=/tmp/n8n.log

# API Configuration
VUE_APP_API_URL=https://your-app.onrender.com
N8N_HOST=your-app.onrender.com
N8N_PROTOCOL=https
N8N_PORT=5678

# Redis (Optional - for caching)
REDIS_URL=redis://localhost:6379

# Telemetry
N8N_DIAGNOSTICS_ENABLED=false
CRASH_ANALYTICS_ENABLED=false
```

## 📁 Project Structure (Optimized)

```
mansa./
├── src/
│   ├── frontend/
│   │   ├── components/
│   │   │   ├── ChatPanel.vue
│   │   │   ├── Editor.vue
│   │   │   └── Sidebar.vue
│   │   ├── services/
│   │   │   ├── GeminiService.ts
│   │   │   ├── MemoryService.ts
│   │   │   ├── CommandParser.ts
│   │   │   └── ApiClient.ts
│   │   ├── App.vue
│   │   ├── main.ts
│   │   └── style.css
│   ├── backend/
│   │   ├── routes/
│   │   │   ├── ai.ts
│   │   │   ├── workflows.ts
│   │   │   ├── nodes.ts
│   │   │   └── health.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── cors.ts
│   │   │   └── error.ts
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── gemini.ts
│   │   │   └── n8n.ts
│   │   ├── server.ts
│   │   └── index.ts
│   └── shared/
│       ├── types.ts
│       └── constants.ts
├── public/
│   ├── index.html
│   └── favicon.ico
├── scripts/
│   ├── setup.sh
│   ├── build.sh
│   ├── start.sh
│   └── migrate.sh
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── render.yaml
├── railway.json
├── Procfile
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🛠 Build Scripts

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run tests
pnpm run test
```

### Production Build

```bash
# Full build
pnpm run build

# Start production server
pnpm run start

# Or via script
bash scripts/build.sh
```

## 🐳 Docker Deployment

### Build & Run Locally

```bash
# Build image
docker build -t mansa .

# Run container
docker run -p 5678:5678 \
  -e GEMINI_API_KEY=your_key \
  -e DB_TYPE=sqlite \
  mansa
```

### Docker Compose

```bash
cd docker && docker-compose up -d
```

## 📊 Deployment Platforms

### ✅ Render.com (Recommended)

**Pros:**
- Free tier available
- Easy environment setup
- Built-in Git integration
- Auto-deploy on push

**Deploy:**
1. Push to GitHub
2. Connect to Render.com
3. Use `render.yaml`
4. Auto-deploy on push

### ✅ Railway.app

**Pros:**
- $5/month free credits
- PostgreSQL included
- GitHub integration
- Simple CLI

**Deploy:**
```bash
railway link
railway service add postgres
railway up
```

### ✅ Heroku

**Pros:**
- Easy deployment
- Add-ons marketplace
- Free SSL
- Scale dynos easily

**Deploy:**
```bash
heroku login
heroku create mansa-app
git push heroku main
```

### ✅ AWS EC2 / DigitalOcean

**Pros:**
- Full control
- Better performance
- More customization
- Cheaper at scale

**Deploy:**
```bash
# SSH to server
ssh user@server

# Clone repo
git clone https://github.com/manshakotra-spec/Mansa.
cd Mansa.

# Run setup
bash scripts/setup.sh

# Start service
bash scripts/start.sh
```

## 🗄️ Database Setup

### SQLite (Default - Single Dyno)

```env
DB_TYPE=sqlite
DB_SQLITE_DATABASE_FILE=/tmp/n8n.db
```

**Note:** Database file is ephemeral. For production, use PostgreSQL.

### PostgreSQL (Recommended)

**Render.com:**
1. Add PostgreSQL service
2. Copy connection string
3. Set as environment variable

**Railway:**
```bash
railway service add postgres
```

**Heroku:**
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

**Connection String:**
```env
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=your-host.com
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_USER=postgres
DB_POSTGRESDB_PASSWORD=password
DB_POSTGRESDB_DATABASE=n8n
```

## 🔐 Security Best Practices

1. **Environment Variables**
   ```bash
   # Never commit .env
   echo ".env" >> .gitignore
   ```

2. **HTTPS Only**
   ```env
   N8N_PROTOCOL=https
   ```

3. **Strong Credentials**
   ```bash
   # Generate strong password
   openssl rand -base64 32
   ```

4. **API Key Rotation**
   - Rotate Gemini API key every 90 days
   - Regenerate JWT secrets after deployment

5. **CORS Configuration**
   ```typescript
   // Allow only your domain
   cors: {
     origin: process.env.FRONTEND_URL,
     credentials: true
   }
   ```

## 📊 Monitoring & Logs

### Render.com Logs
```bash
# View logs in dashboard
# Or via CLI
render logs
```

### Railway Logs
```bash
railway logs
```

### Local Logs
```bash
# Stream logs
tail -f /tmp/n8n.log

# Or via Docker
docker logs -f container_name
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Change port
PORT=3000 npm start
```

### Database Connection Error
```bash
# Check connection string
echo $DATABASE_URL

# Migrate database
npm run migrate
```

### AI Assistant Not Responding
```bash
# Verify API key
echo $VUE_APP_GEMINI_API_KEY

# Test API
curl -X POST http://localhost:5678/api/ai-command \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}'
```

### Out of Memory
```env
# Increase Node memory
NODE_OPTIONS="--max-old-space-size=2048"
```

## 📈 Performance Optimization

### Build Optimization
```bash
# Enable production optimizations
NODE_ENV=production npm run build

# Minify assets
npm run build:optimize
```

### Database Indexing
```sql
-- Add indexes for faster queries
CREATE INDEX idx_workflows_user ON workflows(user_id);
CREATE INDEX idx_executions_workflow ON executions(workflow_id);
```

### Caching
```env
# Enable Redis caching
REDIS_URL=redis://cache-server:6379
```

## 🔄 CI/CD Pipeline

### GitHub Actions
```yaml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: curl ${{ secrets.RENDER_DEPLOY_HOOK }}
```

## 📞 Support & Resources

- **N8N Docs**: https://docs.n8n.io
- **Render Docs**: https://render.com/docs
- **Gemini API**: https://ai.google.dev
- **Repository**: https://github.com/manshakotra-spec/Mansa.

## 📝 License

Dual License:
- **N8N**: Fair-code license
- **Mansa AI**: Custom license

---

**Ready to deploy?** Start with Render.com - connect your GitHub and deploy in 5 minutes! 🚀
