# Production Deployment Guide

## 🚀 **Live Deployment Setup**

### **1. Frontend Deployment (Vercel)**

#### **Step 1: Prepare Frontend**
```bash
cd frontend
npm run build
```

#### **Step 2: Deploy to Vercel**
1. Go to [Vercel](https://vercel.com)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set output directory: `.next`
5. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com`

#### **Step 3: Update API URLs**
Update all API calls in frontend to use production backend URL:
- Change `http://localhost:5001` to `https://your-backend-url.com`

### **2. Backend Deployment (Railway/Render)**

#### **Step 1: Prepare Backend**
```bash
cd backend
npm install
```

#### **Step 2: Deploy to Railway**
1. Go to [Railway](https://railway.app)
2. Connect your GitHub repository
3. Set start command: `npm start`
4. Add environment variables:
   - `NODE_ENV=production`
   - `PORT=5001`
   - `GEMINI_API_KEY=your_key`
   - `INSTAGRAM_ACCESS_TOKEN=your_token`
   - `INSTAGRAM_BUSINESS_ACCOUNT_ID=your_id`
   - `N8N_WEBHOOK_URL=your_n8n_url`
   - `FRONTEND_URL=https://your-frontend-url.vercel.app`

### **3. Environment Variables Required**

#### **Backend (.env)**
```
NODE_ENV=production
PORT=5001
GEMINI_API_KEY=your_gemini_api_key_here
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here
N8N_WEBHOOK_URL=https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test
FRONTEND_URL=https://your-domain.vercel.app
```

#### **Frontend (Vercel Environment Variables)**
```
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### **4. Production Features**

#### **✅ Enhanced Multi-Page System**
- Multiple Instagram accounts support
- Unique AI-generated titles per page
- Individual title selection
- Simultaneous posting to multiple pages
- Progress tracking and results

#### **✅ Real Instagram Integration**
- Remove test mode for production
- Real Instagram API integration
- Proper error handling
- Secure credential management

#### **✅ Production Optimizations**
- Environment-based configuration
- Proper CORS settings
- Error logging and monitoring
- Performance optimizations

### **5. Deployment Checklist**

- [ ] Frontend built and deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Environment variables configured
- [ ] API URLs updated for production
- [ ] CORS settings configured
- [ ] Instagram credentials set up
- [ ] n8n webhook configured
- [ ] Domain configured (optional)
- [ ] SSL certificates enabled
- [ ] Error monitoring set up

### **6. Post-Deployment**

#### **Test Production Features:**
1. Video upload functionality
2. Instagram account connection
3. AI title generation
4. Multi-page posting
5. Error handling

#### **Monitor:**
- Application performance
- Error logs
- User interactions
- Instagram API usage

## 🎯 **Ready for Live Launch!**

Your enhanced multi-page Instagram automation system is ready for production deployment!
