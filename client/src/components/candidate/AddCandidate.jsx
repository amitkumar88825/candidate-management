import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../authenticate/AuthContext";

const AddCandidate = () => {
  const { admin } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // useNavigate hook for redirection

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile", mobile);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("password", password);
    if (image) {
      formData.append("image", image); 
    }

    try {
      await axios.post(
        "http://44.203.200.89/api/admin/candidates/",
        formData,
        {
          headers: {
            Authorization: `${admin.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Candidate added successfully!");

      setName("");
      setMobile("");
      setAddress("");
      setEmail("");
      setPassword("");
      setImage(null);

      // Redirect to the Candidates List Page
      navigate("/admin/candidates");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add candidate. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add New Candidate
        </h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter full name"
            />
          </div>

          {/* Mobile Number */}
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600 mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter mobile number"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-2">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter address"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter email address"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter password"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-600 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded-lg text-lg font-semibold transition duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Adding Candidate..." : "Add Candidate"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
