const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: 'public/',
    filename: async (req, file, cb) => {
        try {
            if (req.route.path === '/instagram') {
                cb(null, 'instagram.jpg');
                return;
            }

            const currentHour = new Date().getHours();
            const fileNameToEncrypt = `${currentHour}-${Date.now()}`;
            
            // Encrypt the filename using SHA256
            const hash = crypto.createHash('sha256');
            hash.update(fileNameToEncrypt);
            const encryptedFilename = hash.digest('hex');

            const newFilename = `${encryptedFilename.substr(0, 12)}${path.extname(file.originalname)}`;

            cb(null, newFilename);
        } catch (error) {
            cb(error);
        }
    },
});

const upload = multer({ storage });

const storage_content = multer.diskStorage({
  destination: 'public/posts/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload_content = multer({ storage: storage_content });

router.post('/update', upload.single('image'), imagesController.update);
router.post('/contentImage', (req, res) => {
  upload_content.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    res.status(200).json({ 
      message: 'Imagem submetida com sucesso'
    });
  });
});
router.get('/image/:ID', imagesController.getImage);
router.delete('/image/:ID', imagesController.delImage);
router.post('/instagram', upload.single('image'), imagesController.instagram);
router.get('/instagram', imagesController.getILink);

module.exports = router;
