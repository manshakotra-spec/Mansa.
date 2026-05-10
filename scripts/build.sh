#!/bin/bash

set -e

echo "🔨 Building Mansa. for production..."

# Install dependencies
echo "📥 Installing dependencies..."
pnpm install --frozen-lockfile

# Build frontend & backend
echo "🏗️  Building application..."
pnpm run build

echo "✅ Build complete!"
echo "Run 'pnpm run start' to start the server"
