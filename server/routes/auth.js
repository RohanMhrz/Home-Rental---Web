import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import User from "../models/User.js";
import sendOTP from "../utils/sendOTP.js";

const router = express.Router();
// Configuration for multer file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage });

// User registration 
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
      const { firstName, lastName, email, password, role } = req.body;
      const profileImage = req.file;
  
      if (!profileImage) {
        return res.status(400).send("No file uploaded");
      }
  
      const profileImagePath = profileImage.path;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists!" });
      }
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Generate 5-digit OTP
      const otp = Math.floor(10000 + Math.random() * 90000);
  
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profileImagePath,
        role: role === 'admin' ? 'admin' : 'user',
        otp, // Save OTP to user model
      });
  
      await newUser.save();
      await sendOTP(email, otp); // Send the generated OTP via email
  
      res.status(200).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Registration failed!", error: err.message });
    }
  });
  
/* USER LOGIN */
router.post("/login", async (req, res) => {
    try {
        /* Take the information from the form */
        // const { email, password, role } = req.body; // Include role in login request
        const { email, password } = req.body; 

        /* Check if user exists */
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "User doesn't exist!" });
        }

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        // /* Validate the role if provided */
        // if (role && user.role !== role) {
        //     return res.status(403).json({ message: "Unauthorized role for this account!" });
        // }

        /* Generate JWT token */
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET); // Include role in token
        delete user.password;

        console.log("token:: ",token);

        res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

// Request Password Reset
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a 5-digit OTP
    const otp = Math.floor(10000 + Math.random() * 90000);
    user.otp = otp;
    await user.save();

    await sendOTP(email, otp); // Reuse your sendOTP utility

    res.status(200).json({ message: "OTP sent to email!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to send OTP.", error: err.message });
  }
});

router.post("/verify-reset-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid email or OTP." });
    }

    // Mark the OTP as verified (optional)
    user.otp = undefined;
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "OTP verified. You can now reset your password." });
  } catch (err) {
    res.status(500).json({ message: "OTP verification failed.", error: err.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isVerified) {
      return res.status(403).json({ message: "OTP not verified or user not found." });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.isVerified = false; // Reset this flag
    await user.save();

    res.status(200).json({ message: "Password has been reset successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Password reset failed.", error: err.message });
  }
});


//Verify OTP
router.post("/verify-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      if (user.otp !== otp) {
        return res.status(401).json({ message: "Invalid OTP." });
      }
  
      // If needed, clear the OTP after successful verification
      user.otp = undefined;
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: "OTP verified successfully!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "OTP verification failed!", error: err.message });
    }
  });
  

export default router;

