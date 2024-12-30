import React from "react";
import { useNavigate } from "react-router-dom";

const candidates = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "123-456-7890",
    position: "Software Engineer",
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "987-654-3210",
    position: "UI/UX Designer",
  },
  {
    name: "Samuel Lee",
    email: "samuel.lee@example.com",
    mobile: "555-555-5555",
    position: "Product Manager",
  },
  {
    name: "Anna Johnson",
    email: "anna.johnson@example.com",
    mobile: "111-222-3333",
    position: "Data Scientist",
  },
];

const CandidateList = () => {
  const navigate = useNavigate();

  // Function to navigate to the Add Candidate page
  const handleAddCandidate = () => {
    navigate("/admin/candidate/create");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        {/* Header with Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Candidates List</h1>
          <button
            onClick={handleAddCandidate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            + Add Candidate
          </button>
        </div>

        {/* Table for displaying candidates */}
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Name</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Email</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Mobile</th>
              <th className="py-2 px-4 text-left text-gray-600 font-semibold">Position</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-gray-700">{candidate.name}</td>
                <td className="py-2 px-4 text-gray-700">{candidate.email}</td>
                <td className="py-2 px-4 text-gray-700">{candidate.mobile}</td>
                <td className="py-2 px-4 text-gray-700">{candidate.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateList;
