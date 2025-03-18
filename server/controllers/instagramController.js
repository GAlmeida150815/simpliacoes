const pool = require('../config/database');
const config = require('../config/config');
const axios = require('axios');

const topicsController = {
  lastPost: async (req, res) => {
    if (!process.env.INSTAGRAM_TOKEN || !process.env.INSTAGRAM_ID) {
      return res.status(400).send('No Instagram token registered in the API');
    }
  
    try {
      const mediaType = ['CAROUSEL_ALBUM', 'IMAGE'];
  
      const responseTmp = await axios.get(`https://graph.instagram.com/${process.env.INSTAGRAM_ID}/media?access_token=${process.env.INSTAGRAM_TOKEN}&fields=media_type`);
  

      const lastPost = responseTmp.data.data.find(p => mediaType.includes(p.media_type));

      if (!lastPost) {
        throw new Error('No matching post found');
      }
  
      try {
        const responsePost = await axios.get(`https://graph.instagram.com/${lastPost.id}?access_token=${process.env.INSTAGRAM_TOKEN}&fields=media_url,permalink,timestamp,caption`);
  
        const data = {
          permalink: responsePost.data.permalink,
          timestamp: responsePost.data.timestamp,
          caption: responsePost.data.caption,
        };
  
        if (lastPost.media_type === mediaType[0]) {
          try {
            const responseTmp = await axios.get(`https://graph.instagram.com/${lastPost.id}/children?access_token=${process.env.INSTAGRAM_TOKEN}&fields=media_url`);
  
            const images = responseTmp.data.data.map(image => image.media_url);
            data.images = images;
  
            return res.status(200).json(data);
          } catch (error) {
            console.error('Error fetching last post info:', error);
            return res.status(500).send('Internal Server Error 1');
          }
        }
  
        data.images = [responsePost.data.media_url];
  
        return res.status(200).json(data);
      } catch (error) {
        console.error('Error fetching last post info:', error);
        return res.status(500).send('Internal Server Error 2');
      }
    } catch (error) {
      console.error('Error fetching last post:', error);
      return res.status(500).send('Internal Server Error 3');
    }
  },  
};

module.exports = topicsController;