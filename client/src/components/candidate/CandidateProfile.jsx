import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../authenticate/AuthContext";
import axios from "axios";

const CandidateProfile = () => {
  const { candidate } = useContext(AuthContext);
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null); // State for profile image
  const [imageLoading, setImageLoading] = useState(false); // Loading state for image upload

  const candidateId = candidate?.id;

  useEffect(() => {
    const fetchCandidateData = async () => {
      try {
        const response = await axios.get(`http://44.203.200.89/api/candidate/${candidateId}`, {
          headers: {
            Authorization: `Bearer ${candidate?.token}`,
          },
        });
        console.log(23, response.data)
        setCandidateData(response.data);
        // Set the profile image if available
        setImage(response.data.profileImage);
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      setImageLoading(true);
      try {
        const response = await axios.post(
          `http://44.203.200.89/api/candidate/profile/${candidateId}`,
          formData,
          {
            headers: {
              Authorization: `${candidate?.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Set the uploaded image in the state
        setCandidateData({ ...candidateData, image: response.data.image });
        setImage(URL.createObjectURL(file)); // Preview the uploaded image
      } catch (err) {
        console.error("Error uploading image:", err);
        setError("Failed to upload profile image.");
      } finally {
        setImageLoading(false);
      }
    }
  };

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
          {/* Profile Image */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden">
              {/* Display uploaded image or default icon */}
              <img
                src={ `http://44.203.200.89${candidateData?.image}` || `https://via.placeholder.com/150` }
                alt={candidate?.name}
                className="object-cover w-full h-full"
              />
            </div>
            <label
              htmlFor="file-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 cursor-pointer"
            >
              {imageLoading ? "Uploading..." : "Change"}
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
        </div>

        {/* Profile Details */}
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
              <p className="mt-2 text-gray-600">********</p>{" "}
              {/* Masked password */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
