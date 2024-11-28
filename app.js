
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const connectDatabase = require('./src/config/dbconfig');
const shortUrlRouter = require('./src/routes/shortUrlRoute');

const app = express();
const hostname = process.env.HOSTNAME ?? "localhost";
const port = process.env.PORT ?? "5000";

// Connecting with Database
connectDatabase()

// Middlewares
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: process.env.SITE_URL || 'http://localhost:3000',
};
app.use(cors(corsOptions));


// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Short URL API',
            version: '1.0.0',
            description: 'API for managing short URLs',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: ['./src/routes/*.js'],  // Point to the router file
};

// Initialize Swagger JSDoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Set up Swagger UI for viewing the API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// App Routes
app.use('/api/shorturl', shortUrlRouter)

// Server Start Process
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

module.exports = app