# Multi-stage Dockerfile for Restaurant Management System
# Stage 1: Base image with Node.js
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the application
CMD ["npm", "start"]

# ==================== PRODUCTION BUILD ====================
# To use multi-stage build for smaller image:
# FROM base AS production
# Only includes necessary files for production

# ==================== DEVELOPMENT IMAGE ====================
# FROM base AS development
# RUN npm install
# CMD ["npm", "run", "dev"]
