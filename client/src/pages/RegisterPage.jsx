import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "../styles/Register.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    role: "user" // Default role
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  console.log(formData);

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
  }, [formData]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();

      for (var key in formData) {
        register_form.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      });

      if (response.ok) {
        // Redirect to OTP verification page and pass email
        navigate("/register/verify-otp", { state: { email: formData.email } });
      } else {
        const errorData = await response.json();
        console.log("Registration failed", errorData.message);
      }
      } catch (err) {
      console.log("Registration failed", err.message);
      }
      };

  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form' onSubmit={handleSubmit}>
          <input placeholder='First Name' name='firstName' value={formData.firstName} onChange={handleChange} required />
          <input placeholder='Last Name' name='lastName' value={formData.lastName} onChange={handleChange} required />
          <input placeholder='Email' name='email' type='email' value={formData.email} onChange={handleChange} required />
          <input placeholder='Password' name='password' type='password' value={formData.password} onChange={handleChange} required />
          <input placeholder='Confirm Password' name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} required />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
          <input id="image" type="file" name="profileImage" accept="image/*" style={{ display: "none" }} onChange={handleChange} required />
          <div>
            <label htmlFor="image">
              <img src="/assets/addImage.png" alt="add profile photo" />
              <p>Upload Your Photo</p>
            </label>

            {formData.profileImage && (
              <img src={URL.createObjectURL(formData.profileImage)} alt='profile photo' style={{ maxWidth: "84px" }} />
            )}
          </div>

          {/* Role Selection */}
          {/* <div>
            <label htmlFor="role">Select Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}

          <button type='submit' disabled={!passwordMatch}>REGISTER</button>
        </form>
        <a href='/login'>Already have an account? Login here</a>
      </div>
    </div>
  );
};

export default RegisterPage;

