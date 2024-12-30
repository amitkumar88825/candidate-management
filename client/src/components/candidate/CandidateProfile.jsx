import React, { useContext, useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../authenticate/AuthContext";
import axios from "axios";

const CandidateProfile = () => {
  const { candidate } = useContext(AuthContext); // Access the candidate data from context
  const [candidateData, setCandidateData] = useState(null); // State to store candidate data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const candidateId = candidate?.id; // Make sure candidate ID is valid

  useEffect(() => {
    // Fetch candidate data using API call
    const fetchCandidateData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/candidate/${candidateId}`, {
          headers: {
            Authorization: `Bearer ${candidate?.token}`, // Include token for authentication
          },
        });
        setCandidateData(response.data); // Set the response data to state
      } catch (err) {
        console.error("Error fetching candidate data:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (candidateId) {
      fetchCandidateData(); // Fetch data only if candidateId is available
    }
  }, [candidateId, candidate?.token]); // Re-fetch when candidateId or token changes

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
          Candidate Profile
        </h1>

        {/* Profile Header with Icon and Name */}
        <div className="flex justify-center items-center mb-8">
          {/* Profile Icon */}
          <div className="flex justify-center items-center w-32 h-32 rounded-full bg-green-500 text-white text-6xl">
            <FaUserAlt />
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Name</h2>
              <p className="mt-2 text-gray-600">{candidateData?.name || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Email</h2>
              <p className="mt-2 text-gray-600">{candidateData?.email || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Mobile</h2>
              <p className="mt-2 text-gray-600">{candidateData?.mobile || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Address</h2>
              <p className="mt-2 text-gray-600">{candidateData?.address || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Password</h2>
              <p className="mt-2 text-gray-600">********</p> {/* Masked password */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
