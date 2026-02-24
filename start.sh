#!/bin/bash

# Quick Start Script for Restaurant Management System
# This script helps you get started with the project

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Restaurant Management System - Quick Start                   ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    echo ""
    exit 1
fi

echo "✅ Node.js detected"
node --version
npm --version
echo ""

# Check if npm packages are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing npm dependencies (this may take a few minutes)..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
    echo "✅ Dependencies installed successfully"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Check for security vulnerabilities
echo "🔍 Checking for security vulnerabilities..."
npm audit --production
echo ""

# Offer options
echo "What would you like to do?"
echo ""
echo "1) Start production server"
echo "2) Start development server with auto-reload"
echo "3) Install additional packages"
echo "4) Check for updates"
echo "5) Exit"
echo ""

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Starting production server on http://localhost:3000"
        echo "Press Ctrl+C to stop"
        echo ""
        npm start
        ;;
    2)
        echo ""
        echo "🚀 Starting development server with auto-reload on http://localhost:3000"
        echo "Press Ctrl+C to stop"
        echo ""
        npm run dev
        ;;
    3)
        echo ""
        read -p "Enter package name (e.g., helmet, compression): " package
        npm install "$package"
        ;;
    4)
        echo ""
        echo "🔄 Checking for updates..."
        npm outdated
        ;;
    5)
        echo ""
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac

echo ""
