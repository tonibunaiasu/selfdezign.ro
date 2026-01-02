# Build stage
# Cache bust - invalidate build cache to force rebuild
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy dependencies
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm run build
RUN echo 'Builder stage - checking dist directory:' && ls -la /app/dist/ || echo 'No /app/dist directory'
RUN echo 'Builder stage - checking dist/public directory:' && ls -la /app/dist/public/ || echo 'No /app/dist/public directory'

# Production stage
FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@10.4.1

# Copy package.json + lockfile from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Install only production deps
RUN pnpm install --frozen-lockfile --prod

# Copy backend dist and frontend public from build stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/shared ./dist/server/shared
COPY --from=builder /app/dist/public ./public
RUN ls -la /public || echo 'ERROR: /public does not exist or is empty'

# Expose port
EXPOSE 3000

# Start
CMD ["pnpm", "start"]
