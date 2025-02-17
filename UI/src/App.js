import "./App.css";
import Login from "./components/Login.js";
import Header from "./components/Header.js";
import Signup from "./components/Signup.js";
import Home from "./components/Home.js";
import Admin from "./components/admin/Admin.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddStudent from "./components/students/AddStudent.js";
import EditStudent from "./components/students/EditStudent.js";
// import PublicProfile from "./components/publicprofile/PublicProfile.js";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* <Route index element={<PublicProfile />} /> */}
          <Route index element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/view_students" element={<Admin />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/editStudent" element={<EditStudent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
