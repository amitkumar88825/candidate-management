import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../authenticate/AuthContext";
import axios from "axios";

const CandidateProfile = () => {
  const { candidate } = useContext(AuthContext);
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const candidateId = candidate?.id;

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const response = await axios.get(`http://44.203.200.89/api/candidate/${candidateId}`, {
          headers: {
            Authorization: `${candidate?.token}`,
          },
        });
        setCandidateData(response.data);
      } catch (err) {
        console.error("Error fetching candidate data:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (candidateId) {
      fetchCandidateData();
    }
  }, [candidateId, candidate?.token]);

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

        <div className="flex justify-center items-center mb-8">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              <img
                src={candidateData?.image ? `http://44.203.200.89${candidateData?.image}` : `https://via.placeholder.com/150`}
                alt={candidate?.name}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Name</h2>
              <p className="mt-2 text-gray-600">
                {candidateData?.name || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Email</h2>
              <p className="mt-2 text-gray-600">
                {candidateData?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Mobile</h2>
              <p className="mt-2 text-gray-600">
                {candidateData?.mobile || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Address</h2>
              <p className="mt-2 text-gray-600">
                {candidateData?.address || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Password</h2>
              <p className="mt-2 text-gray-600">********</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
