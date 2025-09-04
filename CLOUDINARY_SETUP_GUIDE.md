# 🔧 Cloudinary Setup Guide

## Step 1: Create Cloudinary Account
1. **Go to**: https://cloudinary.com/users/register/free
2. **Sign up** for free account
3. **Verify email** and login

## Step 2: Get Your Credentials
1. **Go to Dashboard** in Cloudinary
2. **Copy these values**:
   - **Cloud Name**: Your cloud name
   - **API Key**: Your API key
   - **API Secret**: Your API secret

## Step 3: Add to Environment Variables

### **For Local Development (.env file):**
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### **For Render Deployment:**
Add these environment variables in your Render dashboard:
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

## Step 4: Test the Integration
1. **Restart your backend server**
2. **Upload a video** through the frontend
3. **Check if it uploads to Cloudinary**
4. **Use the Cloudinary URL** in your n8n workflow

## 🎯 **What This Does:**
- ✅ **Uploads videos** to Cloudinary
- ✅ **Optimizes videos** for Instagram Reels (1080x1920)
- ✅ **Returns public URLs** that Instagram can access
- ✅ **Falls back** to old method if Cloudinary fails

**Get your Cloudinary credentials and add them to your environment variables!** 🚀
