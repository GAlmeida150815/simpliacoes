const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.use(express.json());

router.post('/login', adminController.authenticateUser);
router.post('/hashPassword', adminController.getHashedPassword);
router.post('/contact', adminController.contact)

module.exports = router;