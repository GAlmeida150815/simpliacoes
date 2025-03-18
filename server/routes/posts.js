const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');

router.use(express.json());


router.get('/latest/:amount/:page?', postsController.getLatest);
router.get('/post/:ID', postsController.getPost);
router.get('/title/:Title', postsController.getPostbyTitle);
router.get('/searchPosts/:amount?/:page?/:topics?', postsController.getPostsSearch);
router.get('/randomPosts/:amount/:id?', postsController.getRandomPosts);
router.get('/:id?', postsController.getAllPosts);

// ? Preview
router.get('/preview/:token', postsController.getPreview);
router.put('/preview/', postsController.setPreview);

router.put('/update', postsController.updatePost);
router.put('/add', postsController.addPost);

router.delete('/:id', postsController.deletePost);

module.exports = router;