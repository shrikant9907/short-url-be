const express = require('express');
const connectDatabase = require('./src/config/dbconfig');
const app = express();

const hostname = process.env.HOSTNAME ?? "localhost"; // 127.0.0.0
const port = process.env.PORT ?? "5000";

// Connecting with Database
connectDatabase()

// Middlewares

// Routes 
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Server Start Process
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})