FROM node:22-slim AS builder
WORKDIR /app

COPY package*.json ./

RUN npm ci --include=optional

COPY . .
ARG FRONTEND_URL
ENV FRONTEND_URL=$FRONTEND_URL

RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/drizzle ./drizzle
COPY docker-entrypoint.sh ./

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["node", "dist/server.js"] 