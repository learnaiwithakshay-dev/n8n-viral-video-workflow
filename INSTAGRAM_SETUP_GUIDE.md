# 🚀 Complete Instagram Integration Setup Guide

## 🎯 **What We've Built**

Your n8n viral video workflow now has **real Instagram integration** using Meta's Graph API. This allows you to:

- ✅ **Upload videos** to Instagram Business accounts
- ✅ **Post with AI-generated titles** 
- ✅ **Manage multiple accounts** simultaneously
- ✅ **Real-time posting status** updates
- ✅ **Professional automation** workflow

## 🔧 **Instagram API Setup Required**

### **Step 1: Create Meta App**
1. Go to https://developers.facebook.com/
2. Click "Create App"
3. Select "Business" type
4. Fill in app details
5. Complete app setup

### **Step 2: Add Instagram Basic Display**
1. In your app dashboard, click "Add Product"
2. Find "Instagram Basic Display" and click "Set Up"
3. Add your Instagram account
4. Configure permissions

### **Step 3: Get Access Token**
1. Go to "Tools" → "Graph API Explorer"
2. Select your app from dropdown
3. Add permissions: `instagram_basic`, `instagram_content_publish`
4. Click "Generate Access Token"
5. **Copy the token** (you'll need this)

### **Step 4: Get Business Account ID**
1. In Graph API Explorer, make this request:
   ```
   GET /me/accounts
   ```
2. Find your Instagram account in the response
3. **Copy the Instagram Business Account ID**

## 📝 **Environment Variables**

Add these to your `backend/.env` file:

```env
# Instagram API Credentials
INSTAGRAM_ACCESS_TOKEN=your_access_token_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_business_account_id_here

# AI Services - OpenRouter API Key
OPENROUTER_API_KEY=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

# n8n Cloud (when ready)
N8N_WEBHOOK_URL=https://learnaiwithakshay.app.n8n.cloud/webhook-test/72b28b45-72ba-4cbc-9cbb-3e841450314a

# Server
PORT=5000
NODE_ENV=development
```

## 🎨 **Frontend Changes**

The Instagram connection form now asks for:
- **Account Name**: Friendly name for your account
- **Business Account ID**: Your Instagram Business Account ID
- **Access Token**: Your Meta Graph API access token

## 🚀 **How to Use**

### **1. Setup Instagram Account**
1. Get your Instagram Business Account ID
2. Get your Meta Graph API access token
3. Add them to your `.env` file

### **2. Connect Account in App**
1. Open your app: http://localhost:3001
2. Go to "Connect Instagram" step
3. Enter your credentials
4. Click "Connect Account"

### **3. Post Videos**
1. Upload a video
2. Generate AI titles
3. Select Instagram accounts
4. Click "Post to Instagram"
5. Watch real posts appear on Instagram! 🎉

## 🔒 **Security Notes**

- **Access tokens expire**: You may need to refresh them
- **Store securely**: Never commit tokens to public repos
- **Business accounts only**: Personal accounts won't work
- **API limits**: Instagram has rate limits

## 🎯 **Testing**

### **Test Credentials**
You can test with:
- Account Name: `Test Business`
- Business Account ID: `123456789`
- Access Token: `test_token_123`

The system will validate credentials before allowing connection.

## 💡 **Troubleshooting**

### **Common Issues**

1. **"Invalid credentials"**
   - Check your access token is valid
   - Ensure Business Account ID is correct
   - Verify app permissions

2. **"Upload failed"**
   - Check video format (MP4 recommended)
   - Ensure video size < 100MB
   - Verify account has posting permissions

3. **"Rate limit exceeded"**
   - Wait before posting again
   - Check Instagram API limits
   - Consider upgrading app tier

## 🎊 **You're Ready!**

Your n8n viral video workflow is now **production-ready** with:
- ✅ Real Instagram posting
- ✅ AI title generation
- ✅ Multi-account management
- ✅ Professional automation
- ✅ Beautiful UI/UX

**Total Cost**: ~$0-20/month (mostly free tiers!)

Your viral video automation dream is now **100% complete**! 🚀
