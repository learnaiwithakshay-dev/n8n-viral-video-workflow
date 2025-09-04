const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

class InstagramService {
  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    this.instagramBusinessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
    this.baseUrl = 'https://graph.facebook.com/v18.0';
  }

  // Upload video to Instagram
  async uploadVideo(videoPath, caption) {
    try {
      console.log('Starting Instagram video upload...');
      
      // Step 1: Create container
      const containerResponse = await this.createContainer(videoPath, caption);
      console.log('Container created:', containerResponse.data);
      
      // Step 2: Upload video file
      await this.uploadVideoFile(containerResponse.data.id, videoPath);
      console.log('Video file uploaded');
      
      // Step 3: Publish the container
      const publishResponse = await this.publishContainer(containerResponse.data.id);
      console.log('Container published:', publishResponse.data);
      
      return {
        success: true,
        postId: publishResponse.data.id,
        status: 'published',
        publishedAt: new Date()
      };
    } catch (error) {
      console.error('Instagram upload error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.error?.message || error.message
      };
    }
  }

  // Create a container for the video
  async createContainer(videoPath, caption) {
    const videoFile = fs.createReadStream(videoPath);
    const stats = fs.statSync(videoPath);
    
    const formData = new FormData();
    formData.append('video_file', videoFile, {
      filename: path.basename(videoPath),
      contentType: 'video/mp4'
    });
    formData.append('caption', caption);
    formData.append('access_token', this.accessToken);
    
    return axios.post(`${this.baseUrl}/${this.instagramBusinessAccountId}/media`, formData, {
      headers: {
        ...formData.getHeaders(),
      }
    });
  }

  // Upload the actual video file
  async uploadVideoFile(containerId, videoPath) {
    const videoFile = fs.createReadStream(videoPath);
    
    const formData = new FormData();
    formData.append('video_file', videoFile, {
      filename: path.basename(videoPath),
      contentType: 'video/mp4'
    });
    formData.append('access_token', this.accessToken);
    
    return axios.post(`${this.baseUrl}/${containerId}`, formData, {
      headers: {
        ...formData.getHeaders(),
      }
    });
  }

  // Publish the container
  async publishContainer(containerId) {
    return axios.post(`${this.baseUrl}/${this.instagramBusinessAccountId}/media_publish`, {
      creation_id: containerId,
      access_token: this.accessToken
    });
  }

  // Get account info
  async getAccountInfo() {
    try {
      const response = await axios.get(`${this.baseUrl}/${this.instagramBusinessAccountId}`, {
        params: {
          fields: 'id,username,name,profile_picture_url,followers_count',
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting account info:', error.response?.data || error.message);
      return null;
    }
  }

  // Check if credentials are valid
  async validateCredentials() {
    try {
      const accountInfo = await this.getAccountInfo();
      return accountInfo !== null;
    } catch (error) {
      return false;
    }
  }
}

module.exports = InstagramService;
