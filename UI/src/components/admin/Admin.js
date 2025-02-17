import axios from "axios";
import React from "react";
import { useState, useEffect, useMemo } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "../../styles/search.css";
import "../../styles/buttons.css";
import "../../styles/admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]); // New state for batches
  const [keyword, setKeyword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [batchName, setBatchName] = useState("");
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'
  const [keywordOption, setKeywordOption] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const endpoints = {
    viewStudents: "http://localhost:8080/viewStudents",
    deleteStudentById: "http://localhost:8080/student/",
    searchById: "http://localhost:8080/searchStudents/",
    searchByName: "http://localhost:8080/searchStudents/studentName/",
    searchByBranch: "http://localhost:8080/searchStudents/studentBranch/",
    searchByCollege: "http://localhost:8080/searchStudents/studentCollege/",
    searchByBatch: "http://localhost:8080/searchStudents/batch/",
    viewBatches: "http://localhost:8080/viewBatches",
    addBatch: "http://localhost:8080/addBatch",
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/viewStudents");
        setStudents(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching students", err);
      }
    };

    const fetchBatches = async () => {
      // Fetch batches
      try {
        const response = await axios.get("http://localhost:8080/viewBatches");
        setBatches(response.data);
        console.log(response.data);
      } catch (err) {
        console.log("Error fetching batches", err);
      }
    };

    fetchStudents();
    fetchBatches(); // Fetch batches when the component mounts
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get(endpoints.viewStudents);
      setStudents(response.data);
      console.log(response.data);
    } catch (err) {
      console.log("Error fetching students", err);
    }
  };

  const onEdit = (student) => {
    console.log("Edit student", student);
    navigate("/editStudent", { state: { student } });
    getStudents();
  };

  const onDelete = async (student) => {
    console.log("Delete student", student);
    try {
      const id = student.studentId;
      await axios.delete(endpoints.deleteStudentById + `${id}`);
    } catch (err) {
      console.log("Error deleting the student", err);
    }
    getStudents();
  };

  const onSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return getStudents();

    let searchEndpoint;
    switch (keywordOption) {
      case "Id":
        searchEndpoint = endpoints.searchById;
        break;
      case "Name":
        searchEndpoint = endpoints.searchByName;
        break;
      case "Branch":
        searchEndpoint = endpoints.searchByBranch;
        break;
      case "College":
        searchEndpoint = endpoints.searchByCollege;
        break;
      default:
        searchEndpoint = endpoints.searchByName;
    }

    try {
      const response = await axios.get(searchEndpoint + `${keyword}`);
      setStudents(response.data);
      console.log("Search successful:", response.data);
    } catch (err) {
      console.error("Error occurred while retrieving data", err);
      getStudents();
    }
  };

  const addBatch = async () => {
    if (!batchId || !batchName) {
      alert("Both Batch ID and Batch Name are required");
      return;
    }

    const newBatch = {
      batchId: batchId,
      batchName: batchName,
    };

    try {
      const response = await axios.post(endpoints.addBatch, newBatch);
      console.log("Batch added successfully:", response.data);
      setBatches([...batches, newBatch]); // Update the batches state with the new batch
      setIsModalOpen(false); // Close the modal
      setBatchId(""); // Reset the input fields
      setBatchName("");
    } catch (err) {
      console.error("Error adding the batch", err);
    }
  };
  const selectBatch = async (batch) => {
    console.log("Select Batch", batch);
    try {
      const response = await axios.get(endpoints.searchByBatch + `${batch}`);
      setStudents(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error occured while retrieving data", err);
      getStudents();
    }
  };

  const sortedStudents = useMemo(() => {
    let sortableStudents = [...students];
    if (sortConfig.key) {
      sortableStudents.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableStudents;
  }, [students, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="pageContainer">
      <button className="adminBack button" onClick={() => navigate("/")}>
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
      <div className="headingCont">
        <h1 style={{ margin: "0" }}>Admin Dashboard</h1>
      </div>
      <div className="search">
        <form className="searchbox" onSubmit={onSearch}>
          <h3 style={{ marginRight: "10px" }}>Search in: </h3>
          <div className="selectContainer">
            <select
              id="searchIn"
              className="selectField"
              value={keywordOption}
              onChange={(e) => setKeywordOption(e.target.value)}
            >
              <option value="Name">Name</option>
              <option value="Email">Email</option>
              <option value="Branch">Branch</option>
              <option value="College">College</option>
            </select>
          </div>
          <input
            id="searchbar"
            className="searchField"
            placeholder="Type here.."
            onChange={(e) => setKeyword(e.target.value)}
          />
          <input className="button searchbutton" type="submit" value="Search" />
        </form>
      </div>
      <div className="contentContainer">
        <div className="sidebar">
          <h3 style={{ textAlign: "center" }}>Batch List</h3>
          <ul className="batchList">
            <li className="batchItem" onClick={getStudents}>
              All Batches
            </li>
            {batches.map((batch, index) => (
              <li
                key={index}
                className="batchItem"
                onClick={() => selectBatch(batch.batchName)}
              >
                {batch.batchName}
              </li>
            ))}
            <li className="batchItem" onClick={() => setIsModalOpen(true)}>
              Add Batch..
            </li>
          </ul>
        </div>
        {isModalOpen && (
          <div className="modalOverlay">
            <div className="modalContent">
              <h3>Add New Batch</h3>
              <input
                type="text"
                placeholder="Batch ID"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="inputField"
              />
              <input
                type="text"
                placeholder="Batch Name"
                value={batchName}
                onChange={(e) => setBatchName(e.target.value)}
                className="inputField"
              />
              <div className="modalButtons">
                <button className="button" onClick={addBatch}>
                  Add
                </button>
                <button
                  className="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mainContent">
          <div className="tada">
            <h3 style={{ position: "relative" }}>Count: {students.length}</h3>
            <div className="viewToggleContainer">
              <button
                onClick={() => setViewMode("card")}
                className="toggleButton"
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode("table")}
                className="toggleButton"
              >
                Table View
              </button>
            </div>
          </div>
          {viewMode === "card" ? (
            <div className="cardsContainer">
              {students.length > 0 ? (
                students.map((student, index) => (
                  <div className="card" key={index}>
                    <h3>{student.studentName}</h3>
                    <p>Email: {student.studentEmail}</p>
                    <p>Mobile: {student.studentMobile}</p>
                    <p>Branch: {student.studentBranch}</p>
                    <p>Percentage: {student.studentPercentage}</p>
                    <p>Batch Name: {student.batchId}</p>
                    <p>College: {student.studentCollege}</p>
                    <div className="buttonContainer">
                      <button
                        className="iconButton"
                        onClick={() => onEdit(student)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="iconButton"
                        onClick={() => onDelete(student)}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="noDataText">No students data available</p>
              )}
            </div>
          ) : (
            <table className="studentsTable">
              <tr>
                <th onClick={() => requestSort("studentName")}>Name</th>
                <th onClick={() => requestSort("studentEmail")}>Email</th>
                <th onClick={() => requestSort("studentMobile")}>Mobile</th>
                <th onClick={() => requestSort("studentBranch")}>Branch</th>
                <th onClick={() => requestSort("studentPercentage")}>
                  Percentage
                </th>
                <th onClick={() => requestSort("batchId")}>Batch</th>
                <th onClick={() => requestSort("studentCollege")}>College</th>
                <th>Actions</th>
              </tr>
              {sortedStudents.length > 0 ? (
                sortedStudents.map((student, index) => (
                  <tr key={index}>
                    <td>{student.studentName}</td>
                    <td>{student.studentEmail}</td>
                    <td>{student.studentMobile}</td>
                    <td>{student.studentBranch}</td>
                    <td>{student.studentPercentage}</td>
                    <td>{student.batchId}</td>
                    <td>{student.studentCollege}</td>
                    <td>
                      <button
                        className="iconButton"
                        onClick={() => onEdit(student)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="iconButton"
                        onClick={() => onDelete(student)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="noDataText">
                    No students data available
                  </td>
                </tr>
              )}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
