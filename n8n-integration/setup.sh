#!/bin/bash

echo "🚀 N8N Integration Setup"
echo "========================"

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 22.16"
    exit 1
fi

echo "✓ Node.js version: $(node -v)"

# Check for pnpm
if ! command -v pnpm &> /dev/null; then
    echo "📦 Installing pnpm..."
    npm install -g pnpm@10.32.1
else
    echo "✓ pnpm version: $(pnpm -v)"
fi

# Install dependencies
echo "📥 Installing dependencies..."
pnpm install

# Build the project
echo "🔨 Building project..."
pnpm run build

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Configure .env.local with your settings"
echo "  2. Run 'pnpm run dev' for development"
echo "  3. Visit http://localhost:3000"
echo ""
