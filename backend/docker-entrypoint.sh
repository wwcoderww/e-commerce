#!/bin/sh

# 1. Automatically apply Drizzle database migrations on startup
echo "Running database migrations..."
npx drizzle-kit migrate --config=./drizzle.config.ts

# 2. Let the container proceed to run your main CMD (node dist/server.js)
echo "Starting Express API server..."
exec "$@"