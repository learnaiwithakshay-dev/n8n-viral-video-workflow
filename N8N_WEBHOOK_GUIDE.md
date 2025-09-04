# 🔗 How to Find Your n8n Cloud Webhook URL

## 🎯 **Step-by-Step Guide**

### **Step 1: Sign Up for n8n Cloud**
1. Go to https://cloud.n8n.io/
2. Click "Get Started" or "Sign Up"
3. Create your free account

### **Step 2: Create a New Workflow**
1. After logging in, click "Create new workflow"
2. Give it a name like "Viral Video Workflow"

### **Step 3: Add Webhook Trigger**
1. Click the "+" button to add a node
2. Search for "Webhook"
3. Select "Webhook" from the list
4. This will be your trigger node

### **Step 4: Get Your Webhook URL**
1. Click on the Webhook node you just created
2. In the right panel, you'll see:
   - **Webhook URL**: `https://your-instance.n8n.cloud/webhook/your-webhook-id`
   - **HTTP Method**: POST
   - **Path**: (usually empty or `/`)

### **Step 5: Copy the Webhook URL**
The URL will look like:
```
https://your-instance.n8n.cloud/webhook/abc123def456
```

### **Step 6: Import Our Workflow**
1. Click the three dots menu (⋮) in the top right
2. Select "Import from file"
3. Choose our workflow file: `n8n-workflows/viral-video-workflow.json`
4. Replace the existing webhook with your new one

## 🔧 **Update Your Environment File**

Once you have your webhook URL, update your `.env` file:

```env
# n8n Cloud Webhook URL
N8N_WEBHOOK_URL=https://your-instance.n8n.cloud/webhook/your-actual-webhook-id

# AI Services - OpenRouter API Key
OPENROUTER_API_KEY=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

# Instagram (for production)
INSTAGRAM_USERNAME=your_username
INSTAGRAM_PASSWORD=your_password

# Server
PORT=5000
NODE_ENV=development
```

## 🎯 **What the Webhook Does**

Your webhook URL will:
1. **Receive data** from your frontend when a video is ready
2. **Trigger the workflow** automatically
3. **Generate AI titles** using OpenRouter
4. **Post to Instagram** via the backend

## 🚀 **Test Your Webhook**

You can test your webhook by sending a POST request to it:

```bash
curl -X POST https://your-instance.n8n.cloud/webhook/your-webhook-id \
  -H "Content-Type: application/json" \
  -d '{"event": "video_ready", "video": {"description": "test"}}'
```

## 💡 **Pro Tips**

- **Free Tier**: n8n Cloud gives you 2 workflows and 100 executions/month free
- **Webhook Security**: The webhook URL is unique and secure
- **Monitoring**: You can see all webhook executions in the n8n Cloud dashboard
- **Error Handling**: Failed executions are logged and can be retried

Your webhook URL is the key that connects your frontend to the n8n automation! 🔗
