const pool = require('../config/database');
const path = require('path');
const fs = require('fs');


const topicsController = {
  getAllTopics(req, res) {
    pool.query('SELECT * FROM Topics', (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  },

  getTopic(req, res) {
      const TopicID = req.params.ID;

      if (!TopicID) {
          return res.status(400).json({ error: 'No topic ID provided'});
      }

      pool.query('SELECT * FROM Topics WHERE ID = ?', [TopicID] ,(error, results, fields) => {
          if (error) {
          res.status(500).json({ error: error.message });
          } else {
          if (results.length > 0){
              res.json(results[0]);
          } else {
              res.status(404).json({ message: 'Topic not found '});
          }
          }
      });
  },

  getPostTopics(req, res) {
    const PostID = req.params.ID;

    if (!PostID) {
        return res.status(400).json({ error: 'No post ID provided'});
    }

    const query = `
      SELECT T.* 
      FROM Topics AS T
      JOIN PostTopics AS PT ON PT.TopicID = T.ID
      WHERE PT.PostID = ?
      ORDER BY T.ID;
    `;

    pool.query(query, [PostID] ,(error, results, fields) => {
        if (error) {
        res.status(500).json({ error: error.message });
        } else {
        if (results.length > 0){
            res.json(results);
        } else {
            res.json([]);
        }
        }
    });
  },

  updateTopic(req, res) {
    const { Name, ID } = req.body;

    if (!Name || !ID) {
      return res.status(400).json({ error: 'Name and ID are required' });
    }

    const query = `
      UPDATE Topics SET 
        Name = ?
      WHERE ID = ?
    `;

    pool.query(query, [Name, parseInt(ID)], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Topic not found' });
      }

      if (req.file) {
        const oldFilePath = path.join(__dirname, '../public/topics', `${ID}.svg`);
        const newFilePath = path.join(__dirname, '../public/topics', `${ID}.svg`);
        const tempFilePath = req.file.path; 

        fs.unlink(oldFilePath, (fsErr) => {
          if (fsErr && fsErr.code !== 'ENOENT') {
            return res.status(500).json({ error: 'Error deleting old image file' });
          }

          fs.rename(tempFilePath, newFilePath, (renameErr) => {
            if (renameErr) {
              return res.status(500).json({ error: 'Error saving new image file' });
            }

            res.json({ message: 'Topic and image updated successfully' });
          });
        });
      } else {
        res.json({ message: 'Topic updated successfully' });
      }
    });
  },

  addTopic(req, res) {
    const { Name } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const query = `
      INSERT INTO Topics  
      (Name)
      VALUES (?)
    `;

    pool.query(query, [Name], (error, results) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      const newTopicId = results.insertId;
      const newFilePath = path.join(__dirname, '../public/topics', `${newTopicId}.svg`);

      fs.rename(req.file.path, newFilePath, (fsErr) => {
        if (fsErr) {
          return res.status(500).json({ error: 'Error saving the image file' });
        }

        res.json({ message: 'Topic and image were added successfully', id: newTopicId });
      });
    });
  },

  deleteTopic(req, res) {
    const ID = req.params.ID;

    const filePath = path.join(__dirname, '../public/topics', `${ID}.svg`);

    fs.unlink(filePath, (fsErr) => {
      if (fsErr && fsErr.code !== 'ENOENT') {
        return res.status(500).json({ error: 'Error deleting the image file' });
      }

      const query = `DELETE FROM Topics WHERE ID = ?`;

      pool.query(query, [ID], (error, results, fields) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        } else {
          res.json({ message: 'Topic and associated image were removed' });
        }
      });
    });
  },
};

module.exports = topicsController;