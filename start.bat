@echo off
REM Quick Start Script for Restaurant Management System
REM This script helps you get started with the project

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║  Restaurant Management System - Quick Start                   ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js detected
node --version
npm --version
echo.

REM Check if npm packages are installed
if not exist "node_modules" (
    echo 📦 Installing npm dependencies (this may take a few minutes)...
    echo.
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
    echo.
) else (
    echo ✅ Dependencies already installed
    echo.
)

REM Check for outdated packages
echo 🔍 Checking for security vulnerabilities...
call npm audit --production
echo.

REM Offer options
echo What would you like to do?
echo.
echo 1) Start production server
echo 2) Start development server with auto-reload
echo 3) Install additional packages
echo 4) Check for updates
echo 5) Exit
echo.

set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo 🚀 Starting production server on http://localhost:3000
    echo Press Ctrl+C to stop
    echo.
    call npm start
) else if "%choice%"=="2" (
    echo.
    echo 🚀 Starting development server with auto-reload on http://localhost:3000
    echo Press Ctrl+C to stop
    echo.
    call npm run dev
) else if "%choice%"=="3" (
    echo.
    set /p package="Enter package name (e.g., helmet, compression): "
    call npm install !package!
) else if "%choice%"=="4" (
    echo.
    echo 🔄 Checking for updates...
    call npm outdated
) else (
    echo.
    echo 👋 Goodbye!
    exit /b 0
)

echo.
pause
