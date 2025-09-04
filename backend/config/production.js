// Production configuration for n8n Viral Video Workflow Backend

const productionConfig = {
  // Server settings
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API Keys
  geminiApiKey: process.env.GEMINI_API_KEY,
  instagramAccessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
  instagramBusinessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID,
  
  // External services
  n8nWebhookUrl: process.env.N8N_WEBHOOK_URL,
  frontendUrl: process.env.FRONTEND_URL,
  
  // File upload settings
  maxFileSize: 100 * 1024 * 1024, // 100MB
  allowedVideoTypes: ['mp4', 'avi', 'mov', 'mkv', 'webm'],
  uploadDirectory: 'uploads',
  
  // CORS settings
  corsOrigins: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  
  // Test mode settings
  enableTestMode: process.env.NODE_ENV !== 'production',
  
  // Error handling
  enableErrorLogging: process.env.NODE_ENV === 'production',
  
  // Rate limiting
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100 // requests per window
};

module.exports = productionConfig;
