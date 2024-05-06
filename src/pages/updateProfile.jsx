import React, { useState, useContext, useEffect } from "react";
import { stateContext } from "../context/MyState.js";
import { doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../firebase/firebase.js";

function UpdateProfile() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userObject = JSON.parse(userString);
      setUserData(userObject);
    }
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const updateUserProfile = async () => {
    try {
      // Update the user profile in the Firestore database
      // have to change LhEB3onSaJUpXajBsQVb with docID
      const userDocRef = doc(fireDB, "user", "LhEB3onSaJUpXajBsQVb");
      await updateDoc(userDocRef, {
        name: name,
        gender: gender,
      });
      console.log("User profile updated successfully!");
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl mb-4">Update Profile</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block mb-2">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={handleGenderChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <button
        onClick={updateUserProfile}
        className="bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600"
      >
        Update Profile
      </button>
    </div>
  );
}

export default UpdateProfile;
