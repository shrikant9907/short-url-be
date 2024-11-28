require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');
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

app.use('/api/shorturl', shortUrlRouter)

// Server Start Process
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

module.exports = app