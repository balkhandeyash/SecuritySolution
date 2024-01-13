const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const nodemailer = require("nodemailer");
const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI =
  "mongodb+srv://root:root@cluster0.mdcnw2v.mongodb.net/UserData?retryWrites=true&w=majority"; // Replace with your MongoDB Atlas connection string

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB database");
});

const User = mongoose.model("User", {
  username: String,
  password: String,
  email: String,
  otp: String,
  otpTimestamp: Number,
});

app.use(cors());
app.use(bodyParser.json());

const secretKey = "Iamyashrajeshbalkhandecsestudent"; // Replace with your secret key

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "balkhandeyash235@gmail.com", // Replace with your email
    pass: "qpna cwut khvc ixgc", // Replace with your email password
  },
});

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to send OTP via email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: "balkhandeyash235@gmail.com", // Replace with your email
    to: email,
    subject: "OTP Verification",
    text: `Your OTP for registration is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Function to check if OTP is valid within the specified timeframe (5 minutes)
const isOtpValid = (timestamp) => {
  const currentTime = Date.now();
  const expirationTime = timestamp + 5 * 60 * 1000; // 5 minutes in milliseconds

  return currentTime <= expirationTime;
};

app.post("/login-otp", async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = generateOTP();

    // Save the OTP and timestamp to the user's document in the database
    const timestamp = Date.now();
    await User.findOneAndUpdate(
      { username },
      { $set: { otp, otpTimestamp: timestamp } }
    );

    // Send OTP to the provided email
    await sendOtpEmail(user.email, otp);

    res.status(200).json({ message: "OTP sent successfully", email: user.email });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP" });
  }
});


app.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a 6-digit OTP
    const otp = generateOTP();

    // Save the OTP and timestamp to the user's document in the database
    const timestamp = Date.now();
    await User.findOneAndUpdate(
      { email },
      { $set: { otp, otpTimestamp: timestamp } }
    );

    // Send OTP to the provided email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Error sending OTP" });
  }
});

app.get("/", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await User.find({ username: "yash" });

  res.send("Hello, World!");
  console.log(existingUser);
});

app.get("/login", async (req, res) => {
  res.send("This is the login page"); // You can send an HTML file or render a login page here

  const existingUser = await User.find({}, {});
  console.log(existingUser);
});

app.post("/register", async (req, res) => {
  try {
    const { username, password, captchaResponse, email, otp } = req.body;
    const existingUser = await User.findOne({ username });

    // Verify OTP length
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return res.status(400).json({ error: "Invalid OTP format" });
    }

    // Verify OTP and timestamp
    const user = await User.findOne({ email, otp });

    

    if (existingUser) {
      // If username already exists, return an error response
      return res.status(400).json({ error: "Username already exists" });
    }

    const recaptchaSecretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${captchaResponse}`;

    const googleResponse = await axios.post(verificationURL);
    const { success } = googleResponse.data;

    if (!success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    console.log("Registration request data:", req.body);

    // If username is unique, create a new user and save it in the database
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password, captchaResponse } = req.body;
    const user = await User.findOne({ username: req.body.username });
    console.log("Pass : ", password, " Hash : ", user.password);

    const recaptchaSecretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${captchaResponse}`;

    const googleResponse = await axios.post(verificationURL);
    const { success } = googleResponse.data;

    if (!success) {
      return res.status(400).json({ error: "reCAPTCHA verification failed" });
    }

    if (!user || !bcrypt.compareSync(password, user.password)) {
      console.log("Inside Conditon");
      return res.status(401).send("Invalid credentials.");
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Success", token });
  } catch (error) {
    res.status(500).send("Error logging in.");
  }
});

app.post("/LandingPage", async (req, res) => {
  
});

app.get("/dashboard", verifyToken, (req, res) => {
  // Only authenticated users can access this route
  res.send("Welcome to the dashboard!");
});

function verifyToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
