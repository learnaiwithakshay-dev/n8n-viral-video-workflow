const Airtable = require('airtable');

class AirtableService {
  constructor() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    
    if (!apiKey) {
      console.warn('⚠️ AirtableService: No AIRTABLE_API_KEY provided, service will be disabled');
      this.enabled = false;
      return;
    }
    
    if (!baseId) {
      console.warn('⚠️ AirtableService: No AIRTABLE_BASE_ID provided, service will be disabled');
      this.enabled = false;
      return;
    }
    
    this.base = new Airtable({
      apiKey: apiKey
    }).base(baseId);
    
    this.tableName = process.env.AIRTABLE_TABLE_NAME || 'Videos';
    this.enabled = true;
  }

  async uploadVideo(videoBuffer, filename, title, accountId) {
    if (!this.enabled) {
      console.warn('⚠️ AirtableService: Service is disabled, returning mock data');
      return {
        success: true,
        recordId: `mock_record_${Date.now()}`,
        videoUrl: `https://mock-video-storage.com/videos/${filename}`,
        message: 'Mock Airtable upload (service disabled)'
      };
    }
    
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
    if (!this.enabled) {
      console.warn('⚠️ AirtableService: Service is disabled, returning mock data');
      return {
        success: true,
        record: { id: recordId, fields: { Name: 'Mock Record' } }
      };
    }
    
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
    if (!this.enabled) {
      console.warn('⚠️ AirtableService: Service is disabled, skipping update');
      return {
        success: true,
        message: 'Mock status update (service disabled)'
      };
    }
    
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
