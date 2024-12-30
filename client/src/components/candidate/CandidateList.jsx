import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../authenticate/AuthContext";
import { AiFillDelete } from "react-icons/ai";

const CandidateList = () => {
  const { admin } = useContext(AuthContext);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!admin || !admin.token) {
      setError("You are not authorized. Please log in as admin.");
      return;
    }

    const fetchCandidates = async () => {
      setLoading(true);
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
  }, [admin]); 
  const handleAddCandidate = () => {
    navigate("/admin/candidate/create");
  };

  const openConfirmModal = (id) => {
    setSelectedCandidateId(id);
    setShowConfirm(true);
  };

  const closeConfirmModal = () => {
    setSelectedCandidateId(null);
    setShowConfirm(false);
  };

  const handleDeleteCandidate = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/admin/candidate/${selectedCandidateId}`,
        {
          headers: {
            Authorization: `${admin.token}`,
          },
        }
      );
      toast.success("Candidate deleted successfully!");
      setCandidates((prevCandidates) =>
        prevCandidates.filter((candidate) => candidate._id !== selectedCandidateId)
      );
    } catch (err) {
      console.error("Error deleting candidate:", err);
      toast.error("Failed to delete candidate. Please try again later.");
    } finally {
      closeConfirmModal();
    }
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
                <th className="py-2 px-4 text-center text-gray-600 font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate._id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-gray-700">{candidate.name}</td>
                  <td className="py-2 px-4 text-gray-700">{candidate.email}</td>
                  <td className="py-2 px-4 text-gray-700">{candidate.mobile}</td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() => openConfirmModal(candidate._id)}
                      className="text-red-600 hover:text-red-800 transition duration-300"
                      title="Delete Candidate"
                    >
                      <AiFillDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <p className="mb-6">Are you sure you want to delete this candidate?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteCandidate}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={closeConfirmModal}
                  className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateList;
