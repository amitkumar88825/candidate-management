import React, { useContext, useEffect, useState } from "react";
import "./App.css";
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
import { AuthContext } from "./components/authenticate/AuthContext";

function App() {
  const { admin, candidate } = useContext(AuthContext);
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (admin || candidate) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
    }
  }, [admin, candidate]);

  return (
    <div id="root">
      {showHeader && <Header />}
      
      <main>
        <div>
          <Routes>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/profile" element={<Profile />} />
            <Route path="/admin/candidate/create" element={<AddCandidate />} />
            <Route path="/admin/candidates" element={<CandidateList />} />
            <Route path="/candidate/login" element={<CandidateLogin />} />
            <Route path="/candidate/profile" element={<CandidateProfile />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
