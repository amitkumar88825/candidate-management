import React from "react";
import { FaUserAlt } from "react-icons/fa"; // Profile Icon

// Dummy Candidate Data (should ideally come from API)
const candidateData = {
  name: "Jane Doe",
  mobile: "1234567890",
  address: "1234 Elm Street, Springfield, IL",
  email: "jane.doe@example.com",
  password: "********", // Hide password for privacy
};

const CandidateProfile = () => {
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
              <p className="mt-2 text-gray-600">{candidateData.name}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Email</h2>
              <p className="mt-2 text-gray-600">{candidateData.email}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Mobile</h2>
              <p className="mt-2 text-gray-600">{candidateData.mobile}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Address</h2>
              <p className="mt-2 text-gray-600">{candidateData.address}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Password</h2>
              <p className="mt-2 text-gray-600">{candidateData.password}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
