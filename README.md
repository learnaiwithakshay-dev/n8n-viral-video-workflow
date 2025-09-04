# n8n Viral Video Workflow

AI-powered video upload and Instagram automation system with n8n backend and React frontend.

## Features
- Video upload and processing
- AI-generated viral titles using free APIs
- Multiple Instagram account management
- Automated posting to Instagram
- User-friendly frontend interface

## Quick Start

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Add your API keys and Instagram credentials

3. Start the development servers:
```bash
npm run dev
```

4. Access the application:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000
   - n8n: http://localhost:5678 (if running locally)

## Project Structure
```
n8n-viral-video-workflow/
├── backend/           # Express.js server
├── frontend/          # Next.js React app
├── n8n-workflows/     # n8n workflow files
└── docs/             # Documentation
```

## Backend Setup

The Express.js server handles:
- Video file processing
- AI title generation via OpenRouter/Gemini
- Instagram API integration
- Multi-account posting

## Frontend Features

- Drag-and-drop video upload
- AI title preview and editing
- Instagram account connection status
- Real-time workflow progress
- Title customization before posting

## Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel --prod
```

### Backend (Railway/Render)
```bash
cd backend
railway up
```

### n8n (n8n Cloud)
1. Sign up at https://cloud.n8n.io/
2. Import workflow from `n8n-workflows/`
3. Configure webhook URLs

## Environment Variables

Create a `.env` file in the root directory:

```env
# n8n Cloud
N8N_WEBHOOK_URL=https://your-instance.n8n.cloud/webhook/your-webhook-id

# AI Services
OPENROUTER_API_KEY=your_openrouter_key

# Instagram (for production)
INSTAGRAM_USERNAME=your_username
INSTAGRAM_PASSWORD=your_password

# Server
PORT=5000
NODE_ENV=development
```

## Free Hosting Options

- **Frontend**: Vercel (Free)
- **Backend**: Railway ($5/month credit - usually free)
- **n8n**: n8n Cloud (Free tier)
- **AI**: OpenRouter (Free tier)
- **Total**: ~$0-5/month
