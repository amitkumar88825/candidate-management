import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../authenticate/AuthContext";

const CandidateList = () => {
  const { admin } = useContext(AuthContext); // Get admin token from AuthContext
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch candidates from API
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/candidates",
          {
            headers: {
              Authorization: `${admin.token}`,
            },
          }
        );
        setCandidates(response.data.candidates || []); 
      } catch (err) {
        console.error("Error fetching candidates:", err);
        setError("Failed to fetch candidates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  const handleAddCandidate = () => {
    navigate("/admin/candidate/create");
  };

  if (loading) {
    return <div className="text-center py-10">Loading candidates...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">
            Candidates List
          </h1>
          <button
            onClick={handleAddCandidate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            + Add Candidate
          </button>
        </div>

        {candidates.length === 0 ? (
          <p className="text-center text-gray-500">No candidates available.</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Name
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Email
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Mobile
                </th>
                <th className="py-2 px-4 text-left text-gray-600 font-semibold">
                  Position
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-700">{candidate.name}</td>
                  <td className="py-2 px-4 text-gray-700">{candidate.email}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {candidate.mobile}
                  </td>
                  <td className="py-2 px-4 text-gray-700">
                    {candidate.position}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
