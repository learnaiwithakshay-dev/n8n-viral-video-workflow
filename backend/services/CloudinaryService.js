const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

class CloudinaryService {
  constructor() {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dtkps2uzi',
      api_key: process.env.CLOUDINARY_API_KEY || '718438387522575',
      api_secret: process.env.CLOUDINARY_API_SECRET || 'WU0l288kOX_R1hXm2QYD8ASbfZs'
    });

    // Set enabled flag
    this.enabled = true;

    // Configure storage
    this.storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: 'viral-videos',
        resource_type: 'video',
        allowed_formats: ['mp4', 'avi', 'mov', 'mkv', 'webm'],
        transformation: [
          { width: 1080, height: 1920, crop: 'fill' }, // Instagram Reels format
          { quality: 'auto' }
        ]
      }
    });
  }

  async uploadVideo(videoBuffer, filename) {
    try {
      console.log('🔍 Starting Cloudinary upload...');
      console.log(`📁 File: ${filename}`);
      console.log(`📏 Buffer size: ${(videoBuffer.length / 1024 / 1024).toFixed(2)} MB`);
      
      // Upload to Cloudinary using base64 encoding
      const base64Data = videoBuffer.toString('base64');
      const dataURI = `data:video/mp4;base64,${base64Data}`;
      
      console.log('📤 Uploading to Cloudinary...');
      
      const result = await cloudinary.uploader.upload(dataURI, {
        resource_type: 'video',
        folder: 'viral-videos',
        public_id: `video_${Date.now()}`,
        transformation: [
          { width: 1080, height: 1920, crop: 'fill' },
          { quality: 'auto' }
        ]
      });

      console.log('✅ Cloudinary upload successful!');
      console.log(`📁 Public ID: ${result.public_id}`);
      console.log(`🔗 URL: ${result.secure_url}`);

      return {
        success: true,
        videoUrl: result.secure_url,
        publicId: result.public_id,
        duration: result.duration,
        size: result.bytes
      };
    } catch (error) {
      console.error('❌ Cloudinary upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async deleteVideo(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: 'video'
      });
      return { success: true, result };
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = CloudinaryService;
