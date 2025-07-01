import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';

const addDoctor = async (req, res) => { 

    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;

        //checking for all required fields
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "All fields are required" });
        }

        // Validating the email format
        if(validator.isEmail(email) === false) {
            return res.json({ success: false, message: "Invalid email format" });
        }

        // Validating the password strength
        if (password.length <8) {
            return res.json({ success: false, message: "Enter a stronger password" });
        }

        // Hashing the password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //image upload
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        });
        const imageUrl = imageUpload.secure_url;

        // Creating the doctor object
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imageUrl,
            date: Date.now()
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success: true, message: "Doctor added successfully"});

    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//Api for admin login
const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({ success: true, token });
        }
        else{
            return res.json({ success: false, message: "Invalid email or password" });
        }
    }
    catch(error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

//api to get all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select("-password");
        res.json({ success: true, doctors });
    } catch (error) {
        console.log(error);
        res.json({ message: error.message, success: false });
    }
}

export { addDoctor, loginAdmin, allDoctors };