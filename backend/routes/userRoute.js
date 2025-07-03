import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import { getProfile } from '../controllers/userController.js';
import { updateProfile } from '../controllers/userController.js';
import  upload  from '../middlewares/multer.js';
import { bookAppointment } from '../controllers/userController.js';
import { listAppointments } from '../controllers/userController.js';
import { cancelAppointment } from '../controllers/userController.js';
import { paymentRazorpay } from '../controllers/userController.js';
import { verifyRazorpay } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/get-profile', authUser, getProfile);
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile);
userRouter.post('/book-appointment', authUser, bookAppointment);
userRouter.get('/appointments', authUser, listAppointments);
userRouter.post('/cancel-appointment', authUser, cancelAppointment);


userRouter.post('/payment-razorpay', authUser, paymentRazorpay);
userRouter.post('/verify-razorpay', authUser, verifyRazorpay);

export default userRouter;
