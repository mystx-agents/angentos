#!/bin/bash
set -e

echo "Starting DB Setup..."
mkdir -p ~/pgdata
if [ ! -f ~/pgdata/PG_VERSION ]; then
    initdb ~/pgdata
fi
pg_ctl -D ~/pgdata stop || true
pg_ctl -D ~/pgdata start
sleep 2
createdb agentos || true

echo "Starting Redis..."
redis-server --daemonize yes || true

echo "Installing Dependencies..."
rm -rf venv
python3 -m venv --system-site-packages venv
source venv/bin/activate
pip install -r requirements.txt

echo "Running Migrations..."
alembic revision --autogenerate -m "Initial schema" || true
alembic upgrade head

echo "All done!"
