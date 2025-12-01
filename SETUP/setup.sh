#!/bin/bash

# LTI - Talent Tracking System - Setup Script
# This script sets up the development environment for both backend and frontend

set -e

echo "🚀 Setting up LTI - Talent Tracking System"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker is not installed. Please install Docker first.${NC}"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker Compose is not installed. Please install Docker Compose first.${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Prerequisites check passed${NC}"
echo ""

# Create .env files if they don't exist
echo "📝 Setting up environment variables..."

# Backend .env
if [ ! -f backend/.env ]; then
    echo "Creating backend/.env from template..."
    cat > backend/.env << EOF
# Database Configuration
DATABASE_URL="postgresql://lti_user:lti_password@localhost:5432/lti_db?schema=public"

# Database Connection Details (used by docker-compose)
DB_HOST=localhost
DB_PORT=5432
DB_USER=lti_user
DB_PASSWORD=lti_password
DB_NAME=lti_db

# Server Configuration
PORT=3010
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000

# File Upload Configuration
UPLOAD_DIR=./uploads
EOF
    echo -e "${GREEN}✓ Created backend/.env${NC}"
else
    echo -e "${YELLOW}⚠️  backend/.env already exists, skipping...${NC}"
fi

# Frontend .env
if [ ! -f frontend/.env ]; then
    echo "Creating frontend/.env from template..."
    cat > frontend/.env << EOF
# API Configuration
REACT_APP_API_URL=http://localhost:3010

# Environment
REACT_APP_ENV=development
EOF
    echo -e "${GREEN}✓ Created frontend/.env${NC}"
else
    echo -e "${YELLOW}⚠️  frontend/.env already exists, skipping...${NC}"
fi

# Root .env for docker-compose
if [ ! -f .env ]; then
    echo "Creating .env for docker-compose..."
    cat > .env << EOF
# Docker Compose Environment Variables
DB_PASSWORD=lti_password
DB_USER=lti_user
DB_NAME=lti_db
DB_PORT=5432
EOF
    echo -e "${GREEN}✓ Created .env for docker-compose${NC}"
else
    echo -e "${YELLOW}⚠️  .env already exists, skipping...${NC}"
fi

echo ""

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p backend/uploads
echo -e "${GREEN}✓ Created backend/uploads directory${NC}"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
cd ..
echo ""

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
cd ..
echo ""

# Start Docker containers
echo "🐳 Starting Docker containers..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
else
    docker compose up -d
fi
echo -e "${GREEN}✓ Docker containers started${NC}"
echo ""

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 5
echo ""

# Generate Prisma client
echo "🔧 Generating Prisma client..."
cd backend
npx prisma generate
echo -e "${GREEN}✓ Prisma client generated${NC}"
echo ""

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy
echo -e "${GREEN}✓ Database migrations completed${NC}"
echo ""

# Seed database
echo "🌱 Seeding database..."
if [ -f prisma/seed.ts ]; then
    npx ts-node prisma/seed.ts
    echo -e "${GREEN}✓ Database seeded${NC}"
else
    echo -e "${YELLOW}⚠️  Seed file not found, skipping...${NC}"
fi
cd ..
echo ""

# Build backend
echo "🔨 Building backend..."
cd backend
npm run build
echo -e "${GREEN}✓ Backend built${NC}"
cd ..
echo ""

echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo "📋 Next steps:"
echo "   1. Start the backend server:"
echo "      cd backend && npm run dev"
echo ""
echo "   2. In a new terminal, start the frontend:"
echo "      cd frontend && npm start"
echo ""
echo "   3. Access the application:"
echo "      Frontend: http://localhost:3000"
echo "      Backend:  http://localhost:3010"
echo ""
echo "   4. To stop Docker containers:"
echo "      docker-compose down"
echo ""

