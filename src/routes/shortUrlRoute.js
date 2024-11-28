const express = require('express');
const {
    getShortURlController,
    createShortURlController,
    updateShortURlController,
    deleteShortURlController,
} = require('../controllers/shortUrlController');

const router = express.Router();

// Routes
router.get('/', getShortURlController);
router.post('/', createShortURlController);
router.put('/:id', updateShortURlController);
router.delete('/:id', deleteShortURlController);

const shortUrlRouter = router;
module.exports = shortUrlRouter;
