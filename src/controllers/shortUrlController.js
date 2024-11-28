const asyncHandler = require('express-async-handler');
const ShortURL = require('../models/shortUrlModel');
const { StatusCodes } = require('http-status-codes');
const { getShortString, sendResponse, validateObjectId } = require('../utils/helper');

// Get Short URLs (all or filtered by original URL), sorted in descending order
const getShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.query;

    const query = originalUrl ? { originalUrl } : {};
    const shortURLs = await ShortURL.find(query).sort({ createdAt: -1 });

    if (!shortURLs.length) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'No URLs found');
    }

    sendResponse(res, StatusCodes.OK, 'Short URLs fetched successfully', shortURLs);
});

// Create a new Short URL
const createShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Original URL is required');
    }

    const shortUrlString = getShortString(9);
    const newShortUrl = new ShortURL({
        originalUrl,
        shortUrl: `${process.env.SITE_URL}/${shortUrlString}`,
    });

    const savedData = await newShortUrl.save();
    sendResponse(res, StatusCodes.CREATED, 'Short URL created successfully', savedData);
});

// Update a Short URL (full update)
const updateShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid ID format');
    }

    if (!originalUrl) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Original URL is required');
    }

    const findURL = await ShortURL.findById(id);
    if (!findURL) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'URL not found');
    }

    findURL.originalUrl = originalUrl;
    const updatedData = await findURL.save();
    sendResponse(res, StatusCodes.OK, 'Short URL updated successfully', updatedData);
});

// Delete a Short URL
const deleteShortURlController = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validateObjectId(id)) {
        return sendResponse(res, StatusCodes.BAD_REQUEST, 'Invalid ID format');
    }

    const deletedData = await ShortURL.findByIdAndDelete(id);
    if (!deletedData) {
        return sendResponse(res, StatusCodes.NOT_FOUND, 'URL not found');
    }

    sendResponse(res, StatusCodes.OK, 'Short URL deleted successfully', deletedData);
});

module.exports = {
    getShortURlController,
    createShortURlController,
    updateShortURlController,
    deleteShortURlController,
};
