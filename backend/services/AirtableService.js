const Airtable = require('airtable');

class AirtableService {
  constructor() {
    this.base = new Airtable({
      apiKey: process.env.AIRTABLE_API_KEY
    }).base(process.env.AIRTABLE_BASE_ID);
    
    this.tableName = process.env.AIRTABLE_TABLE_NAME || 'Videos';
  }

  async uploadVideo(videoBuffer, filename, title, accountId) {
    try {
      // Create a record in Airtable with video information
      const record = await this.base(this.tableName).create([
        {
          fields: {
            'Name': title,
            'Caption': title,
            'URL': `https://your-video-storage.com/videos/${filename}`, // This would be your actual video storage URL
            'Account ID': accountId,
            'Status': 'Pending',
            'Upload Date': new Date().toISOString()
          }
        }
      ]);

      return {
        success: true,
        recordId: record[0].id,
        videoUrl: `https://your-video-storage.com/videos/${filename}`, // Return the actual video URL
        message: 'Video uploaded to Airtable successfully'
      };
    } catch (error) {
      console.error('Airtable upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getVideoRecord(recordId) {
    try {
      const record = await this.base(this.tableName).find(recordId);
      return {
        success: true,
        record: record
      };
    } catch (error) {
      console.error('Airtable get record error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async updateStatus(recordId, status) {
    try {
      await this.base(this.tableName).update([
        {
          id: recordId,
          fields: {
            'Status': status,
            'Updated Date': new Date().toISOString()
          }
        }
      ]);

      return {
        success: true,
        message: 'Status updated successfully'
      };
    } catch (error) {
      console.error('Airtable update error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = AirtableService;
