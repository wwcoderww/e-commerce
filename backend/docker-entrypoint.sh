#!/bin/sh
echo "Running database migrations..."
npx drizzle-kit migrate --config=./drizzle.config.ts
echo "Starting Express API server..."
exec "$@"