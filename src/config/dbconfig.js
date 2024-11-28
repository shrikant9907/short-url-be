const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load the correct .env file based on NODE_ENV
const result = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

if (result.error) {
    console.error(`Error loading .env.${process.env.NODE_ENV} file`);
    process.exit(1);
}

const connectDatabase = async () => {
    try {
        const connectionString = process.env.MONGODB_URI;
        await mongoose.connect(connectionString);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Could not connect to Database', error);
        process.exit(1);
    }

}

module.exports = connectDatabase;