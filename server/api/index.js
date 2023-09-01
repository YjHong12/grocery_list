const express = require('express');
const router = express.Router();

router.get('/get', (req, res) => {
    res.send('Get all items');
});

// ROUTER: /api/items
router.use('/items', require('./items'));

module.exports = router;

