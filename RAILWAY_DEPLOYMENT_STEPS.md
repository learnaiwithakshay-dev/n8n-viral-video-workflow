# 🚀 **RAILWAY DEPLOYMENT - EXACT STEPS**

## **Current Status:**
- ✅ Frontend deployed to Vercel: https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app
- ⏳ Backend needs deployment to Railway

## **Railway Deployment Steps:**

### **Step 1: On Railway New Project Page**
1. Click **"Deploy from GitHub repo"** button
2. If you see "Connect GitHub" - click that first
3. Authorize Railway to access your GitHub

### **Step 2: Select Repository**
1. Find your repository in the list
2. Click on it to select
3. Look for **"Root Directory"** field
4. Type: `backend`

### **Step 3: Configure Settings**
1. **Start Command**: `npm start`
2. **Build Command**: Leave empty (auto-detect)

### **Step 4: Environment Variables**
Add these one by one:
- `NODE_ENV` = `production`
- `PORT` = `5001`
- `GEMINI_API_KEY` = `AIzaSyBSx0SUs7lsH1Q4mo90nW_s7zN5I4G51lU`
- `INSTAGRAM_ACCESS_TOKEN` = `your_instagram_access_token_here`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID` = `your_instagram_business_account_id_here`
- `N8N_WEBHOOK_URL` = `https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test`
- `FRONTEND_URL` = `https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app`

### **Step 5: Deploy**
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build
3. Note the Railway URL provided

## **After Deployment:**
1. Copy the Railway URL
2. Go to Vercel project settings
3. Add environment variable: `NEXT_PUBLIC_API_URL`
4. Set value to Railway URL
5. Redeploy frontend

## **🎯 Expected Result:**
- Backend: `https://your-app.railway.app`
- Frontend: `https://frontend-c28eezgnf-akshayseeken-9851s-projects.vercel.app`
- Connected and working together!
