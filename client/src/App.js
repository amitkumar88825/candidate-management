import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import Header from './components/navbar/Header';
import AdminLogin from "./components/authenticate/AdminLogin";
import CandidateLogin from "./components/authenticate/CandidateLogin";

function App() {
  return (
    <div id="root">
      <Header />
      <main>
        <div>
          <Routes>
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="candidate/login" element={<CandidateLogin />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;


