#!/bin/bash
set -e

echo "Running the migrations..."
pnpm dotenvx run -- pnpm --filter="@repo/helper" db:migrate

echo "Building for the production..."
pnpm dotenvx run -- turbo build

echo "Starting production server..."
pnpm dotenvx run -- turbo start

wait $PID
