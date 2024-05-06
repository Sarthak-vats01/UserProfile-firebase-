import React, { useRef, useState, useEffect, useContext } from "react";
import Header from "../components/header";
// import { stateContext } from "../context/MyState.js";

function Home() {
  const imageRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  // const context = useContext(stateContext);
  // const { user } = context;
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const userObject = JSON.parse(userString);
      setUserData(userObject);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
        imageRef.current;

      const centerX = offsetLeft + offsetWidth / 2;
      const centerY = offsetTop + offsetHeight / 2;

      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      const rotateX = deltaY / 10;
      const rotateY = deltaX / 10;

      setRotation({ x: rotateX, y: rotateY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="h-screen w-screen ">
      <Header />
      <section className="flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Our Website
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover amazing content and services tailored just for you.
        </p>
        <div
          className="rounded-lg overflow-hidden  mb-8"
          style={{
            perspective: "1000px",
          }}
        >
          {userData && (
            <img
              ref={imageRef}
              className="h-80 w-auto"
              src={userData.profilePhoto} // Access profilePhoto directly from userData
              alt="Profile"
              style={{
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            />
          )}
        </div>
        <div className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer transition duration-300">
          Explore Now
        </div>
      </section>
    </div>
  );
}

export default Home;
