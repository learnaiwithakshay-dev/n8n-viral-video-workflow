const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: 'dtkps2uzi',
  api_key: '718438387522575',
  api_secret: 'WU0l288kOX_R1hXm2QYD8ASbfZs'
});

async function checkCloudinaryVideos() {
  try {
    console.log('🔍 Checking Cloudinary for uploaded videos...\n');
    
    // List all videos in the viral-videos folder
    const viralVideosResult = await cloudinary.api.resources({
      resource_type: 'video',
      max_results: 50
    });
    
    // Filter for viral-videos folder
    const viralVideos = viralVideosResult.resources.filter(video => 
      video.public_id.startsWith('viral-videos/')
    );
    
    console.log(`📊 Found ${viralVideos.length} videos in viral-videos folder:\n`);
    
    if (viralVideos.length > 0) {
      viralVideos.forEach((video, index) => {
        console.log(`🎬 Viral Video ${index + 1}:`);
        console.log(`   📁 Public ID: ${video.public_id}`);
        console.log(`   🔗 URL: ${video.secure_url}`);
        console.log(`   📏 Size: ${(video.bytes / 1024 / 1024).toFixed(2)} MB`);
        console.log(`   ⏱️ Duration: ${video.duration} seconds`);
        console.log(`   📅 Created: ${new Date(video.created_at).toLocaleString()}`);
        console.log(`   📂 Folder: ${video.folder || 'Root'}`);
        console.log('');
      });
    } else {
      console.log('❌ No videos found in viral-videos folder.');
      console.log('💡 Try uploading a video through your frontend first.\n');
    }
    
    // List all videos (including samples)
    console.log(`📊 Found ${viralVideosResult.resources.length} total videos in Cloudinary:\n`);
    
    viralVideosResult.resources.forEach((video, index) => {
      console.log(`🎬 Video ${index + 1}:`);
      console.log(`   📁 Public ID: ${video.public_id}`);
      console.log(`   🔗 URL: ${video.secure_url}`);
      console.log(`   📏 Size: ${(video.bytes / 1024 / 1024).toFixed(2)} MB`);
      console.log(`   ⏱️ Duration: ${video.duration} seconds`);
      console.log(`   📅 Created: ${new Date(video.created_at).toLocaleString()}`);
      console.log(`   📂 Folder: ${video.folder || 'Root'}`);
      console.log('');
    });
    
    console.log('✅ All videos listed above are publicly accessible and can be used for Instagram posting.');
    
  } catch (error) {
    console.error('❌ Error checking Cloudinary videos:', error);
    
    if (error.message && error.message.includes('Invalid signature')) {
      console.log('💡 This might be an authentication issue. Check your API credentials.');
    }
  }
}

// Run the check
checkCloudinaryVideos();
