import React from "react";
import "../styles/forms.css";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/admin", {
        adminName: fullName,
        adminEmail: email,
        adminPassword: password,
        adminMobile: mobile,
      });
      console.log(response.data);
    } catch (err) {
      console.log("error occured while saving data, please try again", err);
    }
  };
  return (
    <div className="signup-container">
      <form className="form-container" onSubmit={submitHandler}>
        <h2 className="form-title">Sign Up Form</h2>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email ID"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="submit-btn" type="submit" value="Sign Up" />
      </form>
      <h3 className="form-footer">
        Already Have an account? Login{" "}
        <a href="http://localhost:3000/login">here</a>
      </h3>
    </div>
  );
};
export default Signup;
