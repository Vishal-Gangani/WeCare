import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';
import http from 'http';


//app configuration
const app = express();
const PORT = process.env.PORT || 10000;

console.log('Render-assigned PORT:', process.env.PORT);

// Initialize database and cloudinary with error handling
try {
  connectDB();
  connectCloudinary();
} catch (error) {
  console.error('❌ Failed to initialize services:', error.message);
  // Continue with server startup even if these fail
}

//middleware
app.use(express.json());
app.use(cors({
  origin: 'https://wecare-frontend.onrender.com',
  credentials: true // set to true if you use cookies or authentication
}));

//api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);


//https://wecare-backend-v4yh.onrender.com/api/admin/add-doctor

app.get('/', (req, res) => {
  res.send('Welcome to WeCare API .........');
});

// Create HTTP server and set timeouts
const server = http.createServer(app);
server.keepAliveTimeout = 120000;
server.headersTimeout = 120000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});