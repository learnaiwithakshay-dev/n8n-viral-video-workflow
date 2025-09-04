#!/bin/bash

# Production Deployment Script for n8n Viral Video Workflow

echo "🚀 Starting Production Deployment..."

# Build Frontend
echo "📦 Building Frontend..."
cd frontend
npm install
npm run build
echo "✅ Frontend built successfully"

# Prepare Backend
echo "🔧 Preparing Backend..."
cd ../backend
npm install
echo "✅ Backend prepared successfully"

# Create deployment package
echo "📋 Creating deployment package..."
cd ..
mkdir -p deployment
cp -r frontend/.next deployment/frontend
cp -r backend deployment/backend
cp DEPLOYMENT.md deployment/
cp README.md deployment/

echo "🎉 Deployment package created!"
echo ""
echo "📋 Next Steps:"
echo "1. Deploy frontend to Vercel:"
echo "   - Upload deployment/frontend to Vercel"
echo "   - Set environment variable: NEXT_PUBLIC_API_URL"
echo ""
echo "2. Deploy backend to Railway/Render:"
echo "   - Upload deployment/backend to Railway"
echo "   - Set all environment variables"
echo "   - Set start command: npm start"
echo ""
echo "3. Configure domains and SSL"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions"
