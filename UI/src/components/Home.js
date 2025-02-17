import React from "react";
import "../styles/home.css";
import "../styles/buttons.css";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <button className="button" onClick={() => navigate("/addStudent")}>
        Add Student
      </button>
      <button
        className="button"
        onClick={() => navigate("/admin/view_students")}
      >
        View Students
      </button>
    </div>
  );
};
export default Home;
