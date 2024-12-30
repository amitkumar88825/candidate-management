import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authenticate/AuthContext";

const Header = () => {
  const { admin, candidate, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle the logout functionality and redirect to the appropriate login page
  const handleLogout = async () => {
    if (admin) {
      await logout(); // Logout admin
      navigate("/admin/login");  // Redirect to admin login page
    } else if (candidate) {
      await logout(); // Logout candidate
      navigate("/candidate/login"); // Redirect to candidate login page
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Task Management</h1>
        <nav>
          <ul className="flex space-x-6">
            {admin && (
              <>
                <li>
                  <Link
                    to="/admin/candidates"
                    className="text-lg hover:text-gray-200 transition duration-300"
                  >
                    Candidates
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/profile"
                    className="text-lg hover:text-gray-200 transition duration-300"
                  >
                    Profile
                  </Link>
                </li>
              </>
            )}
            {candidate && (
              <li>
                <Link
                  to="/candidate/profile"
                  className="text-lg hover:text-gray-200 transition duration-300"
                >
                  Profile
                </Link>
              </li>
            )}
            <li>
              <Link
                to="#"
                onClick={handleLogout}
                className="text-lg hover:text-gray-200 transition duration-300"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
