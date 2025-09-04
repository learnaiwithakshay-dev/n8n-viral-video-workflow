# 🚀 **DIRECT RENDER DEPLOYMENT**

## **🎯 Quick Deployment Links:**

### **Step 1: Direct Render Dashboard**
Click this link: https://dashboard.render.com/new/web-service

### **Step 2: GitHub Repository Selection**
After clicking the link above, you'll see:
1. **"Connect a repository"** button
2. Select your GitHub account
3. Find: `n8n With Cursor Ai Workflow`
4. Click **"Connect"**

### **Step 3: Service Configuration**
Fill in these exact values:
- **Name**: `n8n-viral-backend`
- **Root Directory**: `backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### **Step 4: Environment Variables**
Click **"Advanced"** and add these one by one:

```
NODE_ENV = production
PORT = 5001
GEMINI_API_KEY = AIzaSyBSx0SUs7lsH1Q4mo90nW_s7zN5I4G51lU
N8N_WEBHOOK_URL = https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test
FRONTEND_URL = https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app
```

### **Step 5: Deploy**
Click **"Create Web Service"** and wait 2-3 minutes.

## **🔗 Alternative: Use render.yaml**
If the above doesn't work, try this direct link:
https://dashboard.render.com/new/web-service?repo=https://github.com/your-username/n8n-With-Cursor-Ai-Workflow

## **📞 Need Immediate Help?**
1. Open https://dashboard.render.com/new/web-service
2. Tell me exactly what you see on the screen
3. I'll guide you through each click and field

## **🎯 Expected Result:**
- Backend URL: `https://n8n-viral-backend.onrender.com`
- Status: "Live"
- Next: Update Vercel frontend with this URL
