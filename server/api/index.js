const express = require('express');
const router = express.Router();

//GET - /api/health
router.get('/health', (req, res, next) => {
    res.send('OK');
});

// ROUTER: /api/items
router.use('/items', require('./items'));

// ROUTER: /api/lists
router.use('/lists', require('./lists'));

// ROUTER: /api/members
router.use('/members', require('./members'));

// ROUTER: /api/auth
router.use('/auth', require('./auth'))

module.exports = router;
