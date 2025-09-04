console.log('🧪 Basic Node.js test...');

try {
  console.log('✅ Node.js is working');
  
  // Test if we can require cloudinary
  console.log('📦 Testing cloudinary package...');
  const cloudinary = require('cloudinary').v2;
  console.log('✅ Cloudinary package loaded successfully');
  
  // Test configuration
  cloudinary.config({
    cloud_name: 'dtkps2uzi',
    api_key: '718438387522575',
    api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
  });
  
  console.log('✅ Cloudinary configured successfully');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
