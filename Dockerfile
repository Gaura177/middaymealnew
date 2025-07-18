# syntax=docker.io/docker/dockerfile:1

# Base stage
FROM node:22-alpine AS base
WORKDIR /app

# Dependencies stage
FROM base AS deps
# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (if available)
COPY package.json ./
# If you have a pnpm-lock.yaml, copy it:
# COPY pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install --no-frozen-lockfile

# Builder stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set env var here so Next.js can embed it at build time
ENV NEXT_PUBLIC_SERVER_URL=https://middaymeal.onrender.com

# Ensure pnpm is available in this stage too
RUN npm install -g pnpm 

RUN pnpm run build

# Production image stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
CMD ["node", "server.js"]
