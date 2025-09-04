# 🔧 n8n Workflow Activation Guide

## Step 1: Go to n8n Cloud
1. **Open**: https://learnaiwithakshay.app.n8n.cloud
2. **Login** to your n8n account

## Step 2: Import the Complete Workflow
1. **Click "Import from file"** or **Create new workflow**
2. **Upload the file**: `n8n-workflows/complete-viral-workflow.json`
3. **Name it**: "Complete Viral Video Instagram Workflow"

## Step 3: Configure Credentials
1. **Airtable Node**:
   - Click on "Update Airtable Record" node
   - Add your Airtable credentials:
     - **API Key**: `patrUK8JnhmDklI2j.f45f97396fe15471fa69fad83deaf6d746346b7c9debd91c7111602039d77ad4`
     - **Base ID**: `appfVqQwxyWbLdrDn`
     - **Table ID**: `tblWYClJPsX4UMZRp`

2. **Instagram Node**:
   - Click on "Post to Instagram" node
   - Add your Instagram credentials (or use test mode for now)

## Step 4: Activate the Workflow
1. **Toggle the switch** in the top-right corner to **ON** (green)
2. **Save the workflow**
3. **Verify webhook URL**: `https://learnaiwithakshay.app.n8n.cloud/webhook-test/webhook-test`

## Step 5: Test the Connection
1. **Click "Execute workflow"** or **"Listen for test event"**
2. **Check the logs** to see if it receives data
3. **Verify the webhook is active**

## Troubleshooting
- **If webhook shows 404**: Workflow is not active
- **If webhook shows empty response**: Workflow is active but not processing
- **If credentials fail**: Check your API keys

## Expected Flow
1. Frontend uploads video
2. Backend sends data to n8n webhook
3. n8n processes data and updates Airtable
4. n8n posts to Instagram
5. n8n responds with success message

**Make sure the workflow is ACTIVE (toggle ON) before testing!**
