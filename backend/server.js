import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';


//app configuration
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//middleware
app.use(express.json());
app.use(cors());

//api endpoints
app.get('/', (req, res) => {
  res.send('Welcome to WeCare API .........');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});