#!/bin/sh
set -e
echo "Running primary database migrations..."
./node_modules/.bin/drizzle-kit migrate
echo "Starting server..."
exec "$@"