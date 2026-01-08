FROM node:24-alpine

WORKDIR /app

# Enable pnpm using corepack (official way)
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency manifests
COPY fe/package.json fe/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY fe .

# Copy shared types
COPY shared ./shared

# Build Next.js app
RUN pnpm run build

# Next.js default port
EXPOSE 3000

# Start Next.js server
CMD ["pnpm", "run", "start"]