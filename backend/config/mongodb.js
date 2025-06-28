import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // Check if MONGODB_URI is defined
        if (!process.env.MONGODB_URI) {
            console.error('❌ MONGODB_URI is not defined in environment variables');
            console.log('📝 Please create a .env file in the backend directory with:');
            console.log('MONGODB_URI=mongodb://localhost:27017');
            process.exit(1);
        }

        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('✅ MongoDB connection established successfully');
        });

        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('⚠️ MongoDB connection disconnected');
        });

        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URI}/WeCare`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error('❌ Failed to connect to MongoDB:', error.message);
        console.log('🔧 Troubleshooting tips:');
        console.log('1. Make sure MongoDB is running on your system');
        console.log('2. Check if the MONGODB_URI in your .env file is correct');
        console.log('3. If using MongoDB Atlas, ensure your IP is whitelisted');
        process.exit(1);
    }
}

export default connectDB;
