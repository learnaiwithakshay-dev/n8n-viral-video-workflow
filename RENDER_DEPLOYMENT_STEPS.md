# 🚀 **RENDER DEPLOYMENT - STEP BY STEP**

## **Current Status:**
- ✅ Frontend deployed to Vercel: https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app
- ✅ Backend code ready and committed to Git
- ✅ Render configuration file created
- ⏳ Ready to deploy backend to Render

## **📋 EXACT STEPS TO FOLLOW:**

### **Step 1: Go to Render Dashboard**
1. Open https://dashboard.render.com/
2. Sign in with your GitHub account

### **Step 2: Create New Web Service**
1. Click **"New +"** button (top right)
2. Select **"Web Service"**

### **Step 3: Connect Repository**
1. Click **"Connect a repository"**
2. Select your GitHub account
3. Find: `n8n With Cursor Ai Workflow`
4. Click **"Connect"**

### **Step 4: Configure Service**
Set these exact values:
- **Name**: `n8n-viral-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### **Step 5: Add Environment Variables**
Click **"Advanced"** and add:
- `NODE_ENV` = `production`
- `PORT` = `5001`
- `GEMINI_API_KEY` = `AIzaSyBSx0SUs7lsH1Q4mo90nW_s7zN5I4G51lU`
- `N8N_WEBHOOK_URL` = `https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test`
- `FRONTEND_URL` = `https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app`

### **Step 6: Deploy**
1. Click **"Create Web Service"**
2. Wait 2-3 minutes
3. Copy the URL provided

## **🎯 After Deployment:**
1. Go to Vercel dashboard
2. Add environment variable: `NEXT_PUBLIC_API_URL` = your Render URL
3. Redeploy frontend
4. Test the complete system!

## **📞 Need Help?**
Tell me what you see on the Render dashboard and I'll guide you through each step!
