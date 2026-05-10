#!/bin/bash

set -e

echo "🗄️  Running database migrations..."

# SQLite migrations
if [ "$DB_TYPE" = "sqlite" ]; then
    echo "Migrating SQLite database..."
    node scripts/migrate-sqlite.js
fi

# PostgreSQL migrations
if [ "$DB_TYPE" = "postgresdb" ]; then
    echo "Migrating PostgreSQL database..."
    node scripts/migrate-postgres.js
fi

echo "✅ Migrations complete!"
