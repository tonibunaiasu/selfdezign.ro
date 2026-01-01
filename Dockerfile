# Build stage
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

# Production stage
FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@10.4.1

# Copy package.json + lockfile from builder
COPY --from=builder /app/package.json /app/pnpm-lock.yaml ./

# Install only production deps
RUN pnpm install --frozen-lockfile --prod

# Copy backend dist and frontend public
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/client/dist ./dist/public

# Expose port
EXPOSE 3000

# Start using pnpm
CMD ["pnpm", "start"]
