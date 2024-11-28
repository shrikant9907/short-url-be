const request = require('supertest');
const { expect } = require('chai');
const app = require('../../app');
const { getShortString, validateObjectId } = require('../utils/helper');
require('dotenv').config();

describe('Short URL API Tests', function () {
    let shortUrlId;
    let shortUrl;

    // Test for createShortURlController (Create a Short URL)
    it('should create a new short URL', async function () {
        const response = await request(app)
            .post('/api/shorturl')
            .send({ originalUrl: 'https://www.example.com' });

        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('Short URL created successfully');
        expect(response.body.data).to.have.property('originalUrl', 'https://www.example.com');
        expect(response.body.data).to.have.property('shortUrl');

        // Store the created short URL and ID for use in later tests
        shortUrlId = response.body.data._id;
        shortUrl = response.body.data.shortUrl;
    });

    // Test for getShortURlController (Fetch Short URLs)
    it('should fetch all short URLs when no query is provided', async function () {
        const response = await request(app)
            .get('/api/shorturl');

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Short URLs fetched successfully');
        expect(response.body.data).to.be.an('array');
    });

    it('should fetch short URLs filtered by original URL', async function () {
        const response = await request(app)
            .get('/api/shorturl')
            .query({ originalUrl: 'https://www.example.com' });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Short URLs fetched successfully');
        expect(response.body.data).to.be.an('array');
        expect(response.body.data[0].originalUrl).to.equal('https://www.example.com');
    });

    it('should return 404 if no short URLs are found', async function () {
        const response = await request(app)
            .get('/api/shorturl')
            .query({ originalUrl: 'https://nonexistent-url.com' });

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('No URLs found');
    });

    // Test for updateShortURlController (Update a Short URL)
    it('should update an existing short URL', async function () {
        const response = await request(app)
            .put(`/api/shorturl/${shortUrlId}`)
            .send({ originalUrl: 'https://www.new-example.com' });

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Short URL updated successfully');
        expect(response.body.data).to.have.property('originalUrl', 'https://www.new-example.com');
    });

    it('should return 400 for invalid ID format', async function () {
        const response = await request(app)
            .put('/api/shorturl/invalidid')
            .send({ originalUrl: 'https://www.new-example.com' });

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid ID format');
    });

    it('should return 404 if the short URL does not exist', async function () {
        const response = await request(app)
            .put('/api/shorturl/607c2f4f93f0bcf18b5f1b94') // Non-existing ID
            .send({ originalUrl: 'https://www.nonexistent.com' });

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('URL not found');
    });

    it('should return 400 if original URL is missing', async function () {
        const response = await request(app)
            .put(`/api/shorturl/${shortUrlId}`)
            .send({}); // Empty body

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Original URL is required');
    });

    // Test for deleteShortURlController (Delete a Short URL)
    it('should delete an existing short URL', async function () {
        const response = await request(app)
            .delete(`/api/shorturl/${shortUrlId}`);

        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Short URL deleted successfully');
    });

    it('should return 400 for invalid ID format', async function () {
        const response = await request(app)
            .delete('/api/shorturl/invalidid');

        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal('Invalid ID format');
    });

    it('should return 404 if the short URL does not exist', async function () {
        const response = await request(app)
            .delete('/api/shorturl/607c2f4f93f0bcf18b5f1b94'); // Non-existing ID

        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal('URL not found');
    });

    // Test for helper functions
    it('should generate a valid short URL string', function () {
        const shortUrlString = getShortString(9);
        expect(shortUrlString).to.have.lengthOf(6);
        expect(shortUrlString).to.match(/^[a-zA-Z0-9]{6}$/);
    });

    it('should return false for invalid ObjectId', function () {
        const result = validateObjectId('invalidId');
        expect(result).to.equal(false);
    });

    it('should return true for valid ObjectId', function () {
        const result = validateObjectId('607c2f4f93f0bcf18b5f1b94'); // A valid MongoDB ObjectId
        expect(result).to.equal(true);
    });
});
