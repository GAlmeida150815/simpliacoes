const pool = require('../config/database');
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const util = require('util');

const { readdir, stat } = fs.promises || fs;

const unlinkAsync = util.promisify(fs.unlink);

const deleteFile = async (path) => {
    try {
        await unlinkAsync(path);
    } catch (err) {

    }
}

const getLatestFile = async (directoryPath) => {
    try {
        const files = await readdir(directoryPath);

        if (!files || files.length === 0) {
            return null; // No files in the directory
        }

        // Get file stats for each file asynchronously
        const fileStatsPromises = files.map(async (file) => {
            const filePath = path.join(directoryPath, file);
            const stats = await stat(filePath);
            return { file, stats };
        });

        // Wait for all file stats to be resolved
        const fileStats = await Promise.all(fileStatsPromises);

        // Sort files by modification time in descending order
        fileStats.sort((a, b) => b.stats.mtime.getTime() - a.stats.mtime.getTime());

        // Return the latest file
        return fileStats[0].file;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const imagesController = {
    update: async (req, res) => {
        try {
            if (!req.file) {
                res.status(400).send('No file uploaded.');
                return;
            }
    
            if (!req.body.ID) {
                res.status(400).send('No id defined.');
                return;
            }
    
            try {
                const latestFile = await getLatestFile("public/");
    
                if (!latestFile) {
                    res.status(500).json({ error: 'No files found in the directory.' });
                    return;
                }
    
                const filePath = path.join('public/', latestFile);
                
                pool.query("UPDATE Posts SET Image = ? WHERE ID = ?", [filePath, parseInt(req.body.ID)], (updateError, updateResults, fields) => {
                    if (updateError) {
                        console.error(updateError.message);
                        res.status(500).json({ error: updateError.message });
                        return;
                    } else {
                        if (updateResults.affectedRows <= 0) {
                            res.status(404).json({ message: 'Post not found' });
                            return;
                        }
                    }
                });
    
                res.status(200).send(`Image uploaded successfully. Path: ${filePath}`);
            } catch (error) {
                res.status(500).json({ error: error.message });
                return;
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
            return;
        }
    },

    getImage: (req, res) => {
        const ID = req.params.ID;
  
        if (!ID) {
            return res.status(400).json({ error: 'No post ID provided'});
        }

        pool.query('SELECT Image FROM Posts WHERE ID = ?', [parseInt(ID)] ,(error, results, fields) => {
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

    delImage: (req, res) => {
        const ID = req.params.ID;

        if (!ID) {
            return res.status(400).json({ error: 'No post ID provided'});
        }

        pool.query('SELECT Image FROM Posts WHERE ID = ?', [parseInt(ID)], (fetchError, fetchResults, fetchFields) => {
            if (fetchError) {
                res.status(500).json({ error: fetchError.message });
                return;
            } else {
                if (fetchResults.length > 0) {
                    if (fetchResults[0] !== 'na') {
                        deleteFile(fetchResults[0].Image);
                    }
                }
            }
        });

        pool.query('UPDATE Posts SET Image = "na" ID = ?', [parseInt(ID)] ,(error, results, fields) => {
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

    instagram: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).send('No file uploaded.');
            }

            if (!req.body.link) {
                return res.status(400).send('No link uploaded');
            }

            pool.query('UPDATE instagram_post SET Link = ? WHERE ID = ?', [req.body.link, 1], (fetchError, fetchResults, fetchFields) => {
                if (fetchError) {
                    res.status(500).json({ error: fetchError.message });
                    return;
                } else {
                    if (fetchResults.length <= 0) {
                        return res.status(500).json({ error: "Something went wrong getting the instagram link" });
                    }
                }
            });
            
            res.status(200).send();
        } catch (error) {
            return res.status(500).json({ error: "Something went wrong getting the instagram link" });
        }
    },

    getILink: async (req, res) => {
        try {
            pool.query('SELECT Link FROM instagram_post WHERE ID = ?', [1], (fetchError, fetchResults, fetchFields) => {
                if (fetchError) {
                    res.status(500).json({ error: `caralho ${fetchError.message}` });
                    return;
                } else {
                    if (fetchResults.length > 0) {
                        return res.json(fetchResults[0]);
                    } else {
                        return res.status(500).json({ error: "Something went wrong getting the instagram link" });
                    }
                }
            }); 
        } catch (error) {
            return res.status(500).json({ error: "Something went wrong getting the instagram link" });
        }
    },
};

module.exports = imagesController;
