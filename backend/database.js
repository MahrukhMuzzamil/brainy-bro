const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection URI
        const uri = 'mongodb://localhost:27017/todoapp';

        // Connect to MongoDB
        await mongoose.connect(uri);

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = { connectDB };
