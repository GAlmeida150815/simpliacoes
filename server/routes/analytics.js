const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.use(express.json());

// ? users
router.get('/activeUsersPerMonth/:Months?', analyticsController.activeUsersPerMonth);
router.get('/usersPerDay/:Days?', analyticsController.usersPerDay);
router.get('/usersPerMonth/:Months?', analyticsController.usersPerMonth);

router.get('/sessions/:Range', analyticsController.sessions);
router.get('/firstUserPrimaryGroupChannel/:Range', analyticsController.firstUserPrimaryGroupChannel);
router.get('/screensAndPages/:Range', analyticsController.screensAndPages);
router.get('/pageViews/:Range', analyticsController.pageViews);
router.get('/userActivity/:Range', analyticsController.userActivity);
// ? newUsers
router.get('/newUsersPerMonth/:Months?', analyticsController.newUsersPerMonth);

// ? device
router.get('/device/:Days?', analyticsController.device)


module.exports = router;