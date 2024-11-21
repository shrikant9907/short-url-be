const express = require('express');
const app = express();

const hostname = process.env.HOSTNAME ?? "localhost"; // 127.0.0.0
const port = process.env.PORT ?? "5000";

// Middlewares

// Connecting with Database

// Routes 
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Server Start Process
app.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})