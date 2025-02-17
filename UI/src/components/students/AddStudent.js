import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/modal.css";

const Modal = ({ message, onConfirm }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{message}</h2>
        <button onClick={onConfirm} className="modal-btn">
          OK
        </button>
      </div>
    </div>
  );
};

const AddStudent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");
  const [branch, setBranch] = useState("");
  const [percentage, setPercentage] = useState("");
  const [percentageErrorMessage, setPercentageErrorMessage] = useState("");
  const [batchId, setBatchId] = useState("");
  const [college, setCollege] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileRegex = /^[6-9]\d{9}$/;

  const addStudentDataHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/student", {
        studentName: fullName,
        studentEmail: email,
        studentMobile: mobile,
        studentBranch: branch,
        studentPercentage: percentage,
        batchId: batchId,
        studentCollege: college,
      });
      console.log(response.data + " added into database");
      setFullName("");
      setEmail("");
      setMobile("");
      setBranch("");
      setPercentage("");
      setBatchId("");
      setCollege("");
      setShowSuccessModal(true);
      // navigate("/admin");
    } catch (err) {
      console.log("Error while Adding Student", err);
      setShowErrorModal(true);
    }
  };

  const validateEmail = () => {
    if (!emailRegex.test(email)) setEmailErrorMessage("Invalid Email Address");
    else setEmailErrorMessage("");
  };
  const validateMobile = () => {
    if (!mobileRegex.test(mobile))
      setMobileErrorMessage("Invalid Mobile Number");
    else setMobileErrorMessage("");
  };

  const validatePercentage = () => {
    if (percentage < 0 || percentage > 100)
      setPercentageErrorMessage("Invalid Percentage");
    else setPercentageErrorMessage("");
  };
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate("/admin"); // Navigate to admin page on success
  };

  const handleErrorConfirm = () => {
    setShowErrorModal(false); // Just close the modal and allow user to retry
    setFullName("");
    setEmail("");
    setMobile("");
    setBranch("");
    setPercentage("");
    setBatchId("");
    setCollege("");
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
      <form className="form-container" onSubmit={addStudentDataHandler}>
        <h2 style={{ textAlign: "center" }}>Add Student Data</h2>
        <input
          required
          placeholder="Full Name"
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
        />
        {emailErrorMessage && (
          <p style={{ margin: "3px", color: "red" }}>{emailErrorMessage}</p>
        )}
        <input
          required
          name="email"
          autoComplete="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onBlur={validateEmail}
        />
        {mobileErrorMessage && (
          <p style={{ margin: "3px", color: "red" }}>{mobileErrorMessage}</p>
        )}
        <input
          required
          placeholder="Mobile Number"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
          onBlur={validateMobile}
        />
        <input
          required
          placeholder="Branch"
          onChange={(e) => setBranch(e.target.value)}
          value={branch}
        />
        {percentageErrorMessage && (
          <p style={{ margin: "3px", color: "red" }}>
            {percentageErrorMessage}
          </p>
        )}
        <input
          required
          placeholder="Percentage"
          onChange={(e) => setPercentage(e.target.value)}
          value={percentage}
          onBlur={validatePercentage}
        />
        <input
          required
          placeholder="Batch Name"
          onChange={(e) => setBatchId(e.target.value)}
          value={batchId}
        />
        <input
          required
          placeholder="College"
          onChange={(e) => setCollege(e.target.value)}
          value={college}
        />
        <input className="submit-btn" type="submit" value="Add Student" />
      </form>
      {showSuccessModal && (
        <Modal
          message="Student added successfully!"
          onConfirm={handleSuccessConfirm}
        />
      )}
      {showErrorModal && (
        <Modal
          message="Error occurred while adding student. Please check the Batch Number and try again. "
          onConfirm={handleErrorConfirm}
        />
      )}
    </div>
  );
};

export default AddStudent;
