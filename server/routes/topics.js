const express = require('express');
const router = express.Router();
const topicsController = require('../controllers/topicsController');
const multer = require('multer');

router.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/topics'); 
  },
  filename: (req, file, cb) => {
    cb(null, 'temp.svg');
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/svg+xml') {
      cb(null, true);
    } else {
      cb(new Error('Only .svg files are allowed!'));
    }
  }
});

router.get('/', topicsController.getAllTopics);
router.get('/:ID', topicsController.getTopic);
router.get('/postTopics/:ID', topicsController.getPostTopics);

router.post('/update', upload.single('image'), topicsController.updateTopic);
router.post('/add', upload.single('image'), topicsController.addTopic);

router.delete('/:ID', topicsController.deleteTopic);

module.exports = router;