import React from "react";
import { FaUserAlt } from "react-icons/fa";

// Dummy admin data
const adminData = {
  name: "John Admin",
  email: "admin.john@example.com",
  password: "********",
};

const Profile = () => {
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
              <p className="mt-2 text-gray-600">{adminData.name}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Email</h2>
              <p className="mt-2 text-gray-600">{adminData.email}</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">Password</h2>
              <p className="mt-2 text-gray-600">{adminData.password}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
