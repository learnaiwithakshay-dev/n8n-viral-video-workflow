# 🔧 Airtable Base and Table ID Guide

## Step 1: Find Your Base ID
1. **Go to**: https://airtable.com
2. **Open your base**
3. **Look at the URL**: `https://airtable.com/appXXXXXXXXXXXXXX/...`
4. **Base ID**: The part after `/app/` (e.g., `appfVqQwxyWbLdrDn`)

## Step 2: Find Your Table ID
1. **In your base**, find the table
2. **Right-click table name** → "Copy table ID"
3. **Or look at URL**: `https://airtable.com/appXXXXXXXXXXXXXX/tblXXXXXXXXXXXXXX/...`
4. **Table ID**: The part after `/tbl/` (e.g., `tblWYCIJPsX4UMZRp`)

## Step 3: Configure n8n
1. **Base**: Select from dropdown (not "By URL")
2. **Table**: Select from dropdown (not "By URL")
3. **Credentials**: Add your API key

## Your Credentials:
- **API Key**: `patrUK8JnhmDklI2j.f45f97396fe15471fa69fad83deaf6d746346b7c9debd91c7111602039d77ad4`
- **Base ID**: `appfVqQwxyWbLdrDn`
- **Table ID**: `tblWYCIJPsX4UMZRp`

## Troubleshooting:
- **Red triangles**: Use dropdown selection, not URLs
- **"Referenced node doesn't exist"**: Import the correct workflow
- **Still failing**: Use simple test workflow first
