const asyncHandler = require('express-async-handler');
const ShortURL = require('../models/shortUrlModel');
const { StatusCodes } = require('http-status-codes');
const { getShortString } = require('../utils/helper');

const getShortURlController = asyncHandler(async (req, res) => {

    // const shortURLs = await ShortURL.find({ originalUrl: "test" });
    const shortURLs = await ShortURL.find();

    if (!shortURLs) {
        return res.status(400).json({
            error: 'Unable to fatch user information ', data: shortURLs
        });
    }

    return res.status(StatusCodes.OK).json({ message: 'Short URL Fetched Successfully.', data: shortURLs });
});

const createShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    // Original URL not found (Bad Request)
    if (!originalUrl) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Original URL is required', data: null
        });
    }

    const shortUrlString = getShortString(9);
    const newShortUrl = new ShortURL({
        originalUrl,
        shortUrl: process.env.SITE_URL + "/" + shortUrlString
    })

    // Created
    const responseData = await newShortUrl.save(); // Save / Update
    if (responseData) {
        return res.status(StatusCodes.CREATED).json({ message: 'Short URL Create Successfully.', data: responseData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Something wrong.', data: responseData });
});

const updateShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({
            error: 'Original URL is required', data: null
        });
    }

    const responseData = { test: "name" };

    return res.status(200).json({ message: 'Short URL Create Successfully.', data: responseData });
});

const partialUpdateShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({
            error: 'Original URL is required', data: null
        });
    }

    // Find and update    

    const responseData = { test: "name" };

    return res.status(200).json({ message: 'Short URL Create Successfully.', data: responseData });
});

const deleteShortURlController = asyncHandler(async (req, res) => {

    const { id } = req.params;
    // Bad Request if Id not found in the URL
    if (!id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: 'ID not found in the URL', data: null
        });
    }

    // Find and Not found
    const findURL = await ShortURL.find({ _id: id });
    if (!findURL) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Unable to find Url with given id', data: null });
    }

    // Find and Delete
    const deletedData = await ShortURL.findByIdAndDelete({ _id: id });
    if (deletedData) {
        return res.status(200).json({ message: 'Short URL Deleted', data: deletedData });
    }

    // Error
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Unable to delete short url.', data: null });

});

module.exports = {
    getShortURlController,
    createShortURlController,
    updateShortURlController,
    partialUpdateShortURlController,
    deleteShortURlController
}