const express = require('express');
const {
    getShortURlController,
    createShortURlController,
    updateShortURlController,
    deleteShortURlController,
} = require('../controllers/shortUrlController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Short URL
 *   description: API for managing short URLs
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all short URLs
 *     tags: [Short URL]
 *     responses:
 *       200:
 *         description: A list of short URLs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   originalUrl:
 *                     type: string
 *                   shortUrl:
 *                     type: string
 */
router.get('/', getShortURlController);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new short URL
 *     tags: [Short URL]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *               customAlias:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created short URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                 shortUrl:
 *                   type: string
 */
router.post('/', createShortURlController);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update an existing short URL
 *     tags: [Short URL]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the short URL to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *               customAlias:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated short URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl:
 *                   type: string
 *                 shortUrl:
 *                   type: string
 */
router.put('/:id', updateShortURlController);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a short URL
 *     tags: [Short URL]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the short URL to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: The short URL was deleted
 */
router.delete('/:id', deleteShortURlController);

const shortUrlRouter = router;
module.exports = shortUrlRouter;
