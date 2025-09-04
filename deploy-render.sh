#!/bin/bash

# Render Deployment Script for n8n Viral Video Backend
# This script helps automate the deployment process

echo "🚀 Starting Render Deployment for n8n Viral Video Backend..."

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please run 'git init' first."
    exit 1
fi

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found."
    exit 1
fi

echo "✅ Repository structure verified"

# Create deployment configuration
echo "📋 Creating deployment configuration..."

cat > render.yaml << 'EOF'
services:
  - type: web
    name: n8n-viral-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    rootDir: backend
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 5001
      - key: GEMINI_API_KEY
        value: AIzaSyBSx0SUs7lsH1Q4mo90nW_s7zN5I4G51lU
      - key: N8N_WEBHOOK_URL
        value: https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test
      - key: FRONTEND_URL
        value: https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app
EOF

echo "✅ render.yaml created"

# Instructions for manual deployment
echo ""
echo "📋 MANUAL DEPLOYMENT STEPS:"
echo ""
echo "1. Go to https://render.com"
echo "2. Sign up/Login with GitHub"
echo "3. Click 'New +' → 'Web Service'"
echo "4. Connect your GitHub repository"
echo "5. Configure:"
echo "   - Name: n8n-viral-backend"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Environment: Node"
echo "   - Plan: Free"
echo ""
echo "6. Add Environment Variables:"
echo "   - NODE_ENV = production"
echo "   - PORT = 5001"
echo "   - GEMINI_API_KEY = AIzaSyBSx0SUs7lsH1Q4mo90nW_s7zN5I4G51lU"
echo "   - N8N_WEBHOOK_URL = https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test"
echo "   - FRONTEND_URL = https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app"
echo ""
echo "7. Click 'Create Web Service'"
echo "8. Wait 2-3 minutes for deployment"
echo "9. Copy the provided URL"
echo ""
echo "🎯 After deployment, update your Vercel frontend with:"
echo "   NEXT_PUBLIC_API_URL = your-render-backend-url"
echo ""
echo "✅ Your backend will be live and ready!"
