// Register.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // Track whether OTP has been sent
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    try {
      // Check if email is provided
      if (!email) {
        alert("Please enter your email address.");
        return;
      }

      // Send OTP to the provided email
      const response = await axios.post(
        "http://127.0.0.1:5001/send-otp",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("OTP sent successfully. Check your email.");
        setOtpSent(true);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again later.");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // Validate email and OTP if OTP has been sent
      if (otpSent && (!email || !otp)) {
        alert("Please enter your email and OTP.");
        return;
      }

      // Perform registration logic with email, username, password, captcha, and OTP
      const response = await axios.post("http://127.0.0.1:5001/register", {
        username,
        password,
        email,
        captchaValue,
        otp,
      });

      console.log("Server Response:", response);

      if (response.status === 201) {
        alert("Registration Successful");
        localStorage.setItem("token", response.data.token);
        navigate("/login");
      } else if (response.status === 400) {
        alert("Registration failed: " + response.data.error);
      } else {
        alert("Registration failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div>
      <div className="register-body">
        <div className="form-container">
          <div className="form-header">
            <h2>Register</h2>
          </div>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <i
                  className={`fas ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  } password-toggle-icon`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* Button to send OTP */}
              <button type="button" onClick={handleSendOTP}>
                Send OTP
              </button>
            </div>
            {/* Display OTP input field only if OTP has been sent */}
            {otpSent && (
              <div className="form-group">
                <label htmlFor="otp">Enter OTP:</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="form-group">
              {/* Google reCAPTCHA */}
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={(value) => setCaptchaValue(value)}
              />
            </div>
            <button type="submit" className="button">
              Register
            </button>
          </form>
          <p>
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
