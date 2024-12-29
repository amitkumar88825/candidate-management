import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Header from './components/navbar/Header';
import AdminLogin from "./components/authenticate/AdminLogin";
import CandidateLogin from "./components/authenticate/CandidateLogin";
import AddCandidate from "./components/candidate/AddCandidate";
import CandidateList from "./components/candidate/CandidateList";
import Profile from "./components/admin/Profile";
import CandidateProfile from "./components/candidate/CandidateProfile";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <div id="root">
      <Header />
      <main>
        <div>
          <Routes>
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin/profile" element={<Profile />} />
            <Route path="/admin/candidate/create" element={<AddCandidate />} />
            <Route path="/admin/candidates" element={<CandidateList />} />
            <Route path="candidate/login" element={<CandidateLogin />} />
            <Route path="candidate/profile" element={<CandidateProfile />} />
          </Routes>
        </div>
      </main>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;


