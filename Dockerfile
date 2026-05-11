FROM node:22-alpine

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@10.32.1

# Copy package files
COPY package*.json ./

# Install dependencies with pnpm
RUN pnpm install --prod

# Copy all source files
COPY src ./src
COPY public ./public
COPY scripts ./scripts
COPY tsconfig.json tsconfig.node.json vite.config.ts ./

# Build application
RUN pnpm run build

# Expose port
EXPOSE 5678

# Create health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5678/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start application
CMD ["pnpm", "run", "start"]
