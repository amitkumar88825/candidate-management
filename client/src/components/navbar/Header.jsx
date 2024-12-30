import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Task Management</h1>
        <nav>
          <ul className="flex space-x-6">
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
            <li>
              <Link
                to="#"
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
