import React, { useState, useContext, useEffect } from "react";
import { stateContext } from "../context/MyState.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router";
import { auth, fireDB, fireStorage } from "../firebase/firebase.js";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Signup() {
  const [imgURL, setImgURL] = useState("");
  const [name, setName] = useState("");
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const context = useContext(stateContext);

  const { user, setUser } = context;

  const handleFileInputUpload = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);

    if (file) {
      const storageRef = ref(fireStorage, "profile_photos/" + file.name); // Use ref() function to create a reference
      const uploadTask = uploadBytes(storageRef, file); // Use uploadBytes() function to upload the file

      uploadTask
        .then((snapshot) => {
          console.log("File uploaded successfully");
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log(downloadURL);
            setImgURL(downloadURL);
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const doSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);

      const q = query(
        collection(fireDB, "user"),
        where("uid", "==", response?.user?.uid)
      );

      const data = onSnapshot(q, (QuerySnapshot) => {
        let userData;
        QuerySnapshot.forEach((doc) => (userData = doc.data()));
        setUser(JSON.stringify(userData));
        localStorage.setItem("user", JSON.stringify(userData));
      });

      navigate("/home");

      localStorage.setItem("token", response.user.accessToken);
    } catch (error) {
      console.log(`Error signing in user ${error}`);
      setErrMsg(error.message);
    }
  };

  const doSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Upload profile photo to Firebase Storage

      const user = {
        uid: response.user.uid,
        name: name,
        gender: gender,
        email: response.user.email,
        profilePhoto: imgURL,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      const userReference = collection(fireDB, "user");

      await addDoc(userReference, user); // Wait for the document to be added

      // Store user data in local storage
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/home");
      localStorage.setItem("token", response.user.accessToken);
    } catch (error) {
      console.log(`Error signing up user ${error}`);
      setErrMsg(error.message);
    }
  };

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {signIn ? "Sign In" : "Sign Up"}
        </h2>
        <form className="space-y-4" onSubmit={signIn ? doSignIn : doSignUp}>
          {signIn ? (
            ""
          ) : (
            <div>
              <input
                type="text"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {signIn ? (
            ""
          ) : (
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          )}
          {signIn ? (
            ""
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileInputUpload}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
          )}
          {errMsg && <div className="text-red-500">{errMsg}</div>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-600"
          >
            {signIn ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={() => setSignIn(!signIn)}
          className="mt-4 block text-center text-sm text-blue-500 hover:underline"
        >
          {signIn
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}

export default Signup;
