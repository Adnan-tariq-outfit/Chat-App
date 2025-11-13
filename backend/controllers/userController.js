// signup a new user

import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = generateToken(newUser._id);

    res.json({
      sucess: true,
      userData: newUser,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// login an existing user
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = generateToken(userData._id);

    res.json({
      success: true,
      userData,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

//controller to check if user is authenticated

export const checkAuth = (req, res) => {
  res.json({
    success: true,
    userData: req.user,
    message: "User is authenticated",
  });
};

// controller to update user profile details

export const updateProfile = async(req, res) =>{
  try {
    const {fullName, email, profilePic} = req.body;
    const userId=req.user._id;
    let updatedUser;
    if(!profilePic){
      await User.findByIdAndUpdate(userId, {fullName, email}, {new: true});
    }else{
      const upload=await cloudinary.uploader.upload(profilePic)
      updatedUser=await User.findByIdAndUpdate(userId, {fullName, email, profilePic:upload.secure_url}, {new: true});
    }
    res.json({
      success: true,
      userData: updatedUser,
      message: "Profile updated successfully",
    }); 
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error during profile update" });
  }
};