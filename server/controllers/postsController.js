const { match } = require('assert');
const pool = require('../config/database');
const fs = require('fs');

const postController = {
  getAllPosts(req, res) {
    const id = [req.params.id] || 0; 
    
    const query = id == 0 ? 
    'SELECT * FROM Posts' : 
    `SELECT * FROM Posts WHERE ID IN (${id.map(() => '?').join(',')}) ORDER BY ID`;

    pool.query(query, [id], (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  },

  getLatest(req, res) {
    const amount = req.params.amount || 3, page = req.params.page || 1; 
    const offset = (page - 1) * amount;

    const query = `SELECT * FROM Posts ORDER BY Creation DESC LIMIT ? OFFSET ?;`;

    const values = [parseInt(amount), parseInt(offset)];
    pool.query(query, values, (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results);
      }
    });
  },

  getPost(req, res) {
    const PostID = req.params.ID;

    if (!PostID) {
      return res.status(400).json({ error: 'No post ID provided'});
    }

    pool.query('SELECT * FROM Posts WHERE ID = ?', [PostID] ,(error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        if (results.length > 0){
          res.json(results[0]);
        } else {
          res.status(404).json({ message: 'Post not found '});
        }
      }
    });
  },

  getPostbyTitle(req, res) {
    const Title = req.params.Title.replace(/ /g,'%');

    if (!Title) {
      return res.status(400).json({ error: 'No post title provided'});
    }

    pool.query('SELECT * FROM Posts WHERE lower(Title) LIKE lower(?)', [`%${Title}%` + '%'] ,(error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        if (results.length > 0){
          res.json(results[0]);
        } else {
          res.status(404).json({ message: 'Post not found '});
        }
      }
    });
  },

  getPostsSearch(req, res) {
    const amount = parseInt(req.params.amount, 10) || 3;
    const page = parseInt(req.params.page, 10) || 1; 
    const offset = (page - 1) * amount;
  
    let topics = req.params.topics ? req.params.topics.split(',').map(Number) : [];
  
    topics = Array.isArray(topics) ? topics : [topics];
  
    let query = `
      SELECT P.*
      FROM Posts AS P
    `;
  
    if (topics.length > 0) {
      query += `
        JOIN (
          SELECT PostID
          FROM PostTopics
          WHERE TopicID IN (${topics.map(() => '?').join(',')})
          GROUP BY PostID
          HAVING COUNT(DISTINCT TopicID) = ?
        ) AS PT ON P.ID = PT.PostID
      `;
    }
  
    query += `
      ORDER BY P.Creation DESC
      LIMIT ?
      OFFSET ?
    `;
  
    let params = [];
  
    if (topics.length > 0) {
      params.push(...topics);
      params.push(topics.length);
    }

    params.push(amount);
    params.push(offset);
  
    pool.query(query, params, (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.json(results.length > 0 ? results : []);
      }
    });
  },

  getRandomPosts(req, res) {
    const PostID = req.params.id;
    const amount = req.params.amount;

    const query = ` SELECT * FROM Posts${PostID ? ` WHERE ID != ? ` : ''} ORDER BY RAND() LIMIT ?; `;

    const parameters = PostID ? [PostID, parseInt(amount)] : [parseInt(amount)];

    pool.query(query, parameters, (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error });
      } else {
        if (results.length > 0){
          res.json(results);
        } else {
          res.status(404).json({ message: 'Post not found '});
        }
      }
    });
  },

  deletePost(req, res) {
    try {
      const postID = req.params.id;
  
      const query = 'DELETE FROM Posts WHERE ID = ?';
      const parameters = [parseInt(postID)];
  
      pool.query(query, parameters, (error, results, fields) => {
        if (error) {
          res.status(500).json({ error: error });
        } else {
          if (results.affectedRows > 0){
            res.json({ message: 'Post deleted successfully' });
          } else {
            res.status(404).json({ message: 'Post not found '});
          }
        }
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updatePost(req, res) {
    const { ID, Title, Description, Introduction, Content, topics } = req.body;
  
    const deleteQuery = `
      DELETE FROM PostTopics
      WHERE PostID = ?
    `;
  
    pool.query(deleteQuery, [parseInt(ID)], (deleteError, deleteResults) => {
      if (deleteError) {
        res.status(500).json({ error: deleteError.message });
      } else {
        const insertQuery = `INSERT INTO PostTopics (PostID, TopicID) VALUES (?,?)`;

        topics.map((topicID) => {
          pool.query(insertQuery, [parseInt(ID), parseInt(topicID)], (insertError, insertResults) => {
          
          if (insertError) {
            res.status(500).json({ error: insertError.message });
          } 
        });
        })
      }    
    });
    
    const updateQuery = `
    UPDATE Posts SET 
      Content = ?,
      Description = ?,
      Introduction = ?,
      Title = ?,
      LastUpdate = ?
    WHERE ID = ?
    `;

    pool.query(updateQuery, [Content, Description, Introduction, Title, new Date(), parseInt(ID)], (updateError, updateResults, fields) => {
        if (updateError) {
          res.status(500).json({ error: updateError.message });
        } else {
          if (updateResults.affectedRows > 0) {
            res.json({ message: 'Post updated successfully' });
          } else {
            res.status(404).json({ message: 'Post not found' });
          }
        }
      }
    );
  },    

  addPost(req, res) {
    const { Title, Description, Introduction, Content, Image, topics } = req.body;

    const postQuery = `
        INSERT INTO Posts  
        (Content,
        Description,
        Introduction,
        Title,
        Creation,
        LastUpdate,
        Image)
        VALUES (?,?,?,?,?,?,?)
    `;

    pool.query(postQuery, [Content, Description, Introduction, Title, new Date(), new Date(), 'na'], (error, results, fields) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      if (results.affectedRows > 0) {
          const postId = results.insertId;

          if (!topics) {
              res.json({ message: 'Post was added', postId });
              return;
          }

          const topicsQuery = `INSERT INTO PostTopics (PostID, TopicID) VALUES (?,?)`;

          Promise.all(
              topics.map((topicID) => {
                  return new Promise((resolve, reject) => {
                      pool.query(topicsQuery, [parseInt(postId), parseInt(topicID)], (error, results) => {
                          if (error) {
                              reject(error);
                          } else {
                              resolve();
                          }
                      });
                  });
              })
          )
              .then(() => {
                  res.json({ message: 'Both were added', postId });
              })
              .catch((error) => {
                  res.status(500).json({ error: error.message });
              });
      } else {
          res.status(404).json({ message: 'Post not found' });
      }
  });
  },  

  setPreview(req, res) {
    const { Token, Post} = req.body;

    if (!Token || !Post)
      res.status(500).json({ error: "No token or post were found."});

    const dataString = `token = ${JSON.stringify(Token)};postData = ${JSON.stringify(Post)};`;
    
    fs.writeFile('temp/previewData', dataString, (err) => {
      if (err) {
        res.status(500).json({ error: err});
        return;
      }

      res.json({ message: "Post preview succesfully stored."});
    });
  },

  getPreview(req, res) {
    const Token = req.params.token;
  
    if (!Token)
      res.status(500).json({ error: "No token was provided." });
  
    try {
      fs.readFile('temp/previewData', 'utf8', async (err, data) => {
        if (err) {
          res.status(500).json({ error: err });
          return;
        }
  
        const matchToken = data.match(/token = "(.+?)";/);

        if (matchToken[1] != Token) {
          res.status(500).json({ error: "Provided token was wrong." });
          return;
        }

        const matchData = data.match(/postData = "(.+?)";/);
  
        if (!matchToken || !matchData) {
          res.status(500).json({ error: "Something went wrong reading the file" });
          return;
        }
  
        // Replace escaped double quotes outside text content with regular double quotes
        const cleanedData = matchData[1].replace(/([^\\])\\"/g, '$1"');
  
        res.json({ post: JSON.parse(cleanedData) });
      });
    } catch (error) {
      console.log(error);
    }
  }
  
};

module.exports = postController;
