# 🚀 **COMPLETE DEPLOYMENT GUIDE**

## **Frontend Deployment (Vercel)**

### **Step 1: Deploy to Vercel**
1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Set build settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### **Step 2: Configure Environment Variables**
Add this environment variable in Vercel:
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://your-railway-backend-url.com` (you'll get this after backend deployment)

### **Step 3: Deploy**
Click "Deploy" and wait for the build to complete.

---

## **Backend Deployment (Railway)**

### **Step 1: Deploy to Railway**
1. Go to [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Set the **Root Directory** to: `backend`

### **Step 2: Configure Build Settings**
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### **Step 3: Add Environment Variables**
Add these environment variables in Railway:

```
NODE_ENV=production
PORT=5001
GEMINI_API_KEY=AIzaSyBSx0SUs7lsH1Q4mo90nW_s7zN5I4G51lU
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here
N8N_WEBHOOK_URL=https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test
FRONTEND_URL=https://your-frontend-app.vercel.app
```

### **Step 4: Deploy**
Click "Deploy" and wait for the build to complete.

---

## **Update Frontend with Backend URL**

### **Step 1: Get Railway URL**
1. Go to your Railway project
2. Click on your service
3. Copy the generated URL (e.g., `https://your-app.railway.app`)

### **Step 2: Update Vercel Environment**
1. Go to your Vercel project
2. Go to Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` with your Railway URL
4. Redeploy the frontend

---

## **Production Features Ready**

### **✅ Enhanced Multi-Page System**
- Multiple Instagram accounts support
- Unique AI-generated titles per page
- Individual title selection
- Simultaneous posting to multiple pages
- Progress tracking and results

### **✅ Production Optimizations**
- Environment-based configuration
- Proper CORS settings
- Error handling and logging
- Performance optimizations
- Security measures

---

## **Final URLs**

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **n8n**: `https://learnaiwithakshay.app.n8n.cloud`

---

## **Testing Production**

1. **Test Video Upload**: Upload a video file
2. **Test Instagram Connection**: Add Instagram credentials
3. **Test AI Title Generation**: Generate titles for multiple pages
4. **Test Multi-Page Posting**: Post to multiple Instagram accounts
5. **Test Error Handling**: Verify error messages work

---

## **Support & Monitoring**

- **Vercel**: Monitor frontend deployment and performance
- **Railway**: Monitor backend logs and performance
- **Instagram API**: Monitor API usage and errors
- **n8n**: Monitor workflow execution

---

## **🚀 READY FOR LIVE LAUNCH!**

Your enhanced multi-page Instagram automation system is now live!
