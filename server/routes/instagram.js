const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagramController');

const config = require('../config/config');
const cron = require('node-cron');

router.use(express.json());

cron.schedule('0 0 */2 * *', () => {
  instagramController.refreshInstagramToken();
})

router.get('/lastPost', instagramController.lastPost);

module.exports = router;