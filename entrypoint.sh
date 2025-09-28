#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Reset database, dropping all tables and re-running migrations
echo "Resetting database..."
npx prisma migrate reset --force

# Run database seeding by executing the compiled JS script directly
echo "Running database seeding..."
node dist/prisma/seed.js

# Start the application
echo "Starting the application..."
exec "$@"
