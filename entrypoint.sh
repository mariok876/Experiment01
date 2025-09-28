#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Run database seeding by executing the compiled JS script directly
echo "Running database seeding..."
node dist/prisma/seed.js

# Start the application
echo "Starting the application..."
exec "$@"
