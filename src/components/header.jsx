import React from "react";
import { auth } from "../firebase/firebase.js";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  async function handleSignOut() {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.log(`Error signing out user ${error}`);
    }
  }

  return (
    <header className="bg-blue-500 text-white py-4 px-8 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li className="hover:text-gray-200 cursor-pointer">Home</li>
        <li
          onClick={() => navigate("/updateProfile")}
          className="hover:text-gray-200 cursor-pointer"
        >
          Update Profile
        </li>
      </ul>
      <button
        onClick={handleSignOut}
        className="bg-white text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-100 hover:text-blue-600 focus:outline-none"
      >
        Log Out
      </button>
    </header>
  );
}

export default Header;
