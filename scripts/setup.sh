#!/bin/bash

# CharterFlow Development Setup Script

echo "🚀 Setting up CharterFlow development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install dependencies for all packages
echo "📦 Installing package dependencies..."
npm run build --if-present

# Start development services
echo "🐳 Starting development services (PostgreSQL, Redis, MinIO)..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 10

# Check if services are running
echo "🔍 Checking service status..."
docker-compose ps

# Copy environment files if they don't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Created .env file from template"
fi

if [ ! -f apps/web/.env.local ]; then
    cp apps/web/.env.example apps/web/.env.local
    echo "📝 Created apps/web/.env.local file from template"
fi

if [ ! -f apps/api/.env ]; then
    cp apps/api/.env.example apps/api/.env
    echo "📝 Created apps/api/.env file from template"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Configure your environment variables in the .env files"
echo "2. Run 'npm run dev' to start the development servers"
echo "3. Visit http://localhost:3000 for the frontend"
echo "4. Visit http://localhost:3001/api for the API documentation"
echo ""
echo "📚 For more information, see the README.md file"
