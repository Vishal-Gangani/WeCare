import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";

//api to register a new user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    //validating email format
    if(!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email format" });
    }

    //validating password strength
    if(password.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters long" });
    }

    // Hashing the password
    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const UserData = {
      name,
      email,
      password: hashedPassword
    };

    // Create a new user
    const newUser = new userModel(UserData);
    const user = await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api to get user profile
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await userModel.findById(userId).select("-password");
    res.json({ success: true, userData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//api to update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, gender, phone, address, dob } = req.body;
    const imageFile = req.file;

    // Validate the input
    if (!name || !gender || !phone || !dob) {
      return res.json({ success: false, message: "All fields are required" });
    }

    let parsedAddress = address;
    if (typeof address === 'string') {
      try {
        parsedAddress = JSON.parse(address);
      } catch (e) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    await userModel.findByIdAndUpdate(userId, { name, gender, phone, address: parsedAddress, dob });

    if (imageFile) {
      // upload to cloudinary
      const imageUpload= await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image"
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    
    res.json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile };
