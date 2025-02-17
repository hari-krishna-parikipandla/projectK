import React from "react";

const Header = () => {
  const loginHandler = () => {
    window.location = "http://localhost:3000/login";
  };
  const signupHandler = () => {
    window.location = "http://localhost:3000/signup";
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>CVCORP Dashboard</h1>
        <div>
          <button onClick={loginHandler} className="button login-button">
            Login
          </button>
          <button onClick={signupHandler} className="button signup-button">
            Signup
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
