import mongoose, { Schema } from 'mongoose';

const SchemaObject = {
    originalUrl: {
        type: String,
        require: true
    },
    shortUrl: {
        type: String,
    }
}

const shortUrlSchema = new Schema(SchemaObject, { timestamps: true })

const ShortURL = mongoose.model('ShortURL', shortUrlSchema);
export default ShortURL;