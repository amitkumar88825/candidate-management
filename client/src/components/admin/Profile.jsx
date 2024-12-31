import React, { useContext, useState, useEffect } from "react";
import { FaUserAlt } from "react-icons/fa";
import { AuthContext } from "../authenticate/AuthContext";
import axios from "axios";

const Profile = () => {
  const { admin } = useContext(AuthContext);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const adminId = admin?.id || null; // Get the admin ID from AuthContext

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if(adminId) {
          const response = await axios.get(`http://44.203.200.89/api/admin/${adminId}`, {
            headers: {
              Authorization: `${admin?.token}`, 
            },
          });
          setAdminData(response.data); 
        }
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    if (adminId) {
      fetchAdminData(); // Fetch data when the adminId is available
    }
  }, [adminId, admin.token]);

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
          Admin Profile
        </h1>

        {/* Profile Header with Icon and Name */}
        <div className="flex justify-center items-center mb-8">
          {/* Profile Icon */}
          <div className="flex justify-center items-center w-32 h-32 rounded-full bg-blue-500 text-white text-6xl">
            <FaUserAlt />
          </div>
        </div>

        {/* Profile Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Name</h2>
              <p className="mt-2 text-gray-600">{adminData?.name || "N/A"}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Email</h2>
              <p className="mt-2 text-gray-600">{adminData?.email || "N/A"}</p>
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

export default Profile;
