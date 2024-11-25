const asyncHandler = require('express-async-handler')

const getShortURlController = asyncHandler(async (req, res) => {

    // Logical part



    res.send('Get Controller called updated' + originalUrl)
});

const createShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({
            error: 'Original URL is required', data: null
        });
    }

    const responseData = { test: "name" };

    return res.status(200).json({ message: 'Short URL Create Successfully.', data: responseData });
});

const updateShortURlController = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({
            error: 'Original URL is required', data: null
        });
    }

    // Find and Save

    Find
    FindAndReplace
    FindAndUpdate
    FindAndDelete
    InsertOne

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
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({
            error: 'Original URL is required', data: null
        });
    }

    // Find and Delete

    const responseData = { test: "name" };

    return res.status(200).json({ message: 'Short URL Create Successfully.', data: responseData });
});

module.exports = {
    getShortURlController,
    createShortURlController,
    updateShortURlController,
    partialUpdateShortURlController,
    deleteShortURlController
}