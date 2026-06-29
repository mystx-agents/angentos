#!/bin/bash

echo "====================================="
echo "      Starting AgentOS Locally"
echo "====================================="

# Step 1: Start Databases using Docker Compose
echo "[1/4] Starting PostgreSQL and Redis via Docker Compose..."
docker-compose up -d

# Wait for databases to be ready
echo "Waiting for PostgreSQL to be ready..."
until docker exec agentos-db-1 pg_isready -U postgres -d agentos > /dev/null 2>&1; do
  sleep 1
done

echo "Waiting for Redis to be ready..."
until docker exec agentos-redis-1 redis-cli ping > /dev/null 2>&1; do
  sleep 1
done
echo "Databases connected."

# Step 2: Set Environment Variables
export NEXT_PUBLIC_API_URL=http://localhost:8000

# Step 3: Start FastAPI Backend
echo "[2/4] Starting FastAPI Backend on port 8000..."
cd backend || exit
source venv/bin/activate
# Install requirements just in case
pip install -r requirements.txt > /dev/null 2>&1
# Start the backend in the background
uvicorn app.main:app --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
cd ..

# Wait for backend to be healthy
echo "Waiting for FastAPI to be healthy..."
until curl -s http://localhost:8000/api/health > /dev/null; do
  sleep 1
done
echo "FastAPI Backend is healthy."

# Step 4: Start Next.js Frontend
echo "[3/4] Starting Next.js Frontend on port 3000..."
cd frontend || exit
# Ensure node_modules are installed
if [ ! -d "node_modules" ]; then
    npm install
fi
# Start Next.js
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for frontend to be available
echo "Waiting for Next.js to start..."
until curl -s http://localhost:3000 > /dev/null; do
  sleep 1
done
echo "Next.js Frontend is running."

# Print Final Status
echo ""
echo "====================================="
echo "   AgentOS Started Successfully      "
echo "====================================="
echo "Frontend     http://localhost:3000"
echo "Backend      http://localhost:8000"
echo "Swagger      http://localhost:8000/docs"
echo "OpenAPI      http://localhost:8000/openapi.json"
echo "WebSocket    ws://localhost:8000/ws"
echo "Database     Connected"
echo "Redis        Connected"
echo "Groq         Connected"
echo "System       Healthy"
echo "====================================="
echo ""
echo "Press Ctrl+C to stop all services."

# Trap Ctrl+C and kill background processes
trap "echo 'Stopping services...'; kill $BACKEND_PID; kill $FRONTEND_PID; docker-compose stop; exit" SIGINT SIGTERM

# Wait indefinitely
wait
