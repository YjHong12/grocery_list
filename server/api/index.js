const express = require('express');
const router = express.Router();

// ROUTER: /api/items
router.use('/items', require('./items'));

// ROUTER: /api/lists
router.use('/lists', require('./lists'));

// ROUTER: /api/members
router.use('/members', require('./members'));

module.exports = router;
