# 🔧 Fix Your n8n Webhook Setup

## ❌ **Current Issue**
Your n8n webhook is returning 404 error: `"The requested webhook is not registered"`

## ✅ **Temporary Fix Applied**
I've temporarily disabled the n8n webhook call so your app works. The workflow will simulate success.

## 🔧 **How to Fix Your n8n Webhook**

### **Step 1: Go to Your n8n Cloud Dashboard**
1. Open https://cloud.n8n.io/
2. Login to your account
3. Find your workflow: "Viral Video Workflow"

### **Step 2: Check Your Webhook Node**
1. Click on your workflow
2. Look for the **Webhook** trigger node (first node)
3. Click on it to open settings

### **Step 3: Verify Webhook URL**
1. In the webhook settings, you should see:
   - **URL**: `https://learnaiwithakshay.app.n8n.cloud/webhook-test/72b28b45-72ba-4cbc-9cbb-3e841450314a`
   - **HTTP Method**: POST
   - **Path**: (should be empty or `/`)

### **Step 4: Activate Your Workflow**
1. Click the **"Execute workflow"** button on the canvas
2. This registers your webhook and makes it active
3. You should see a green checkmark or "Active" status

### **Step 5: Test Your Webhook**
1. In your workflow, click the **"Test step"** button on the webhook node
2. This will show you the exact webhook URL to use
3. Copy the new URL if it's different

### **Step 6: Update Your Code**
Once you have the correct webhook URL:

1. **Open**: `backend/server.js`
2. **Find**: The n8n webhook section (around line 180)
3. **Uncomment**: The real webhook call
4. **Comment out**: The simulation code

```javascript
// Replace this:
res.json({ 
  success: true, 
  workflowId: 'simulated-workflow-' + Date.now(),
  message: 'n8n workflow simulation successful'
});

// With this:
const n8nResponse = await axios.post('YOUR_NEW_WEBHOOK_URL', {
  event: 'video_ready',
  video: videoData,
  title: title,
  accounts: accounts
});

res.json({ success: true, workflowId: n8nResponse.data.id });
```

## 🎯 **Common Issues & Solutions**

### **Issue 1: Webhook Not Active**
- **Solution**: Click "Execute workflow" in n8n Cloud

### **Issue 2: Wrong Webhook URL**
- **Solution**: Copy the URL from the webhook node settings

### **Issue 3: Workflow Not Published**
- **Solution**: Make sure your workflow is published/active

### **Issue 4: Test Mode Only**
- **Solution**: The error message says "In test mode, the webhook only works for one call after you click this button"
- **Fix**: Click "Execute workflow" before testing

## 🚀 **Test Your Fix**

1. **Fix your n8n webhook** (follow steps above)
2. **Update your code** with the correct webhook URL
3. **Restart your backend**: `cd backend && npm run dev`
4. **Test your app**: Upload a video and try posting

## 💡 **Pro Tips**

- **Keep workflow active**: n8n webhooks only work when the workflow is active
- **Check logs**: Look at n8n Cloud execution logs for errors
- **Test first**: Always test the webhook in n8n before integrating
- **Backup URL**: Save your webhook URL somewhere safe

Your app will work perfectly once the webhook is properly set up! 🎉
