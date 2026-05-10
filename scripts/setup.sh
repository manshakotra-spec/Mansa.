#!/bin/bash

set -e

echo "🚀 Mansa. Setup Script"
echo "====================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Install from: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js: $(node -v)"

# Check pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@10.32.1
fi

echo "✓ pnpm: $(pnpm -v)"

# Create .env if not exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Update .env with your configuration"
fi

# Install dependencies
echo "📥 Installing dependencies..."
pnpm install

# Build project
echo "🔨 Building project..."
pnpm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update .env with your API keys"
echo "  2. Run: pnpm run dev (development)"
echo "  3. Or: pnpm run start (production)"
echo ""
