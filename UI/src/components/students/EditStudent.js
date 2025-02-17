import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [branch, setBranch] = useState("");
  const [batchId, setBatchId] = useState("");
  const [percentage, setPercentage] = useState("");
  const [college, setCollege] = useState("");

  useEffect(() => {
    if (state && state.student) {
      const student = state.student;
      setStudentId(student.studentId);
      setFullName(student.studentName);
      setEmail(student.studentEmail);
      setMobile(student.studentMobile);
      setBranch(student.studentBranch);
      setBatchId(student.batchId);
      setPercentage(student.studentPercentage);
      setCollege(student.studentCollege);
    }
  }, [state]);

  const editStudentDataHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:8080/student", {
        studentId,
        studentName: fullName,
        studentEmail: email,
        studentMobile: mobile,
        studentBranch: branch,
        batchId: batchId,
        studentPercentage: percentage,
        studentCollege: college,
      });
      console.log(response.data + " updated into database");
    } catch (err) {
      console.log("Error while editing Student", err);
    }
    setFullName("");
    setEmail("");
    setMobile("");
    setBranch("");
    setPercentage("");
    setBatchId("");
    setCollege("");
    // Optionally, navigate back or clear the form
    navigate("/admin");
  };

  return (
    <div>
      <button className="button" onClick={() => navigate("/")}>
        <svg
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-arrow-left"
          viewBox="0 0 16 16"
        >
          <path d="M9.293 1.293a1 1 0 0 1 1.414 0L14 4.586A1 1 0 0 1 14 6H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h10a1 1 0 0 1 .707 1.707L9.293 6.293a1 1 0 0 1-1.414-1.414L11.586 3H4a1 1 0 0 1-1-1v10a1 1 0 0 1 1-1h7.586L7.879 11.293a1 1 0 0 1 1.414 1.414l4-4a1 1 0 0 1 0-1.414l-4-4z" />
        </svg>
        Back
      </button>
      <form className="form-container" onSubmit={editStudentDataHandler}>
        <h2>Edit Student Data</h2>
        <input
          name="full Name"
          required
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        <input
          name="Email"
          autoComplete="email"
          required
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          name="Mobile Number"
          required
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
        />
        <input
          name="Branch"
          required
          placeholder="Branch"
          onChange={(e) => setBranch(e.target.value)}
          value={branch}
        />
        <input
          name="Batch"
          required
          placeholder="Batch Number"
          onChange={(e) => setBatchId(e.target.value)}
          value={batchId}
        />
        <input
          name="percentage"
          required
          placeholder="Percentage"
          onChange={(e) => setPercentage(e.target.value)}
          value={percentage}
        />
        <input
          name="college"
          required
          placeholder="College"
          onChange={(e) => setCollege(e.target.value)}
          value={college}
        />
        <input className="submit-btn" type="submit" value="Edit Student" />
      </form>
    </div>
  );
};

export default EditStudent;
