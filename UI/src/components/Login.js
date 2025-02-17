import React, { useState } from "react";
import "../styles/forms.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dbUsername = await axios.get(
        `http://localhost:8080/viewAdmins/${userName}`
      ).data.adminEmail;
      const dbPassword = await axios.get(
        `http://localhost:8080/viewAdmins/${password}`
      ).data.adminPassword;
      if (validateUser(dbUsername, dbPassword)) navigate("/");
      else console.log("Username and Password doesnt Match");
    } catch (err) {
      console.log("error occured while retrieveing the data", err);
    }
  };
  const validateUser = (dbUsername, dbPassword) => {
    if (userName.equals(dbUsername) && password.equals(dbPassword)) return true;
    else return false;
  };
  return (
    <div className="login-container">
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Login Form</h2>
        <input
          type="text"
          placeholder="Email"
          onClick={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onClick={(e) => setPassword(e.target.value)}
        />
        <input className="submit-btn" type="submit" value="Login" />
      </form>
      <h1 className="form-footer">
        Not a User? Register <a href="http://localhost:3000/signup">here</a>
      </h1>
    </div>
  );
};

export default Login;
