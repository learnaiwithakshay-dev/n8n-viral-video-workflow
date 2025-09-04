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
      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'video',
            folder: 'viral-videos',
            public_id: `video_${Date.now()}`,
            transformation: [
              { width: 1080, height: 1920, crop: 'fill' },
              { quality: 'auto' }
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(videoBuffer);
      });

      return {
        success: true,
        videoUrl: result.secure_url,
        publicId: result.public_id,
        duration: result.duration,
        size: result.bytes
      };
    } catch (error) {
      console.error('Cloudinary upload error:', error);
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
