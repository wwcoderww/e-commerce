FROM node:22-slim AS builder
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN mkdir -p /app/.next/cache && chown -R node:node /app
USER node

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
