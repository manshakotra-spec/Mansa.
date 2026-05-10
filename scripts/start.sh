#!/bin/bash

set -e

echo "▶️  Starting Mansa. server..."

# Check .env
if [ ! -f .env ]; then
    echo "❌ .env file not found"
    echo "Create .env from .env.example"
    exit 1
fi

# Set production
export NODE_ENV=production

echo "Starting server..."
node dist/index.js
