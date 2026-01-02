# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@10.4.1

# Copy package files
COPY pnpm-lock.yaml package.json ./

# Install dependencies
RUN pnpm install

# Copy source code
COPY . .

# Build
RUN pnpm run build

# Production stage
FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@10.4.1

# Copy package.json
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy dist from build stage
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start
CMD ["node", "dist/index.js"]
