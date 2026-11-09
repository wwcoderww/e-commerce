#!/bin/sh
set -e
echo "Running production database migrations..."
npx drizzle-kit migrate
echo "Starting Express API server..."
exec "$@"