import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Timer from "../components/timer";
export default function Home() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null); // State to store user data

  const [message, setMessage] = useState("");

  //   fetch('http://localhost:8000/notes', {
  //     method: 'POST',
  //     credentials: 'include',     // make sure session cookies are included
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newNote)
  // })

  const verifySession = async () => {
    try {
      const response = await fetch(
        "http://localhost:5001/api/protectedRoutes/home",
        {
          method: "POST",
          credentials: "include", // Include cookies in the request
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        console.log("Session verified", userData);
        // return response.json();
      } else {
        throw new Error("Unauthorized");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("You are not authorized to view this page. Please log in.");
      // navigate("/"); // Redirect to login page
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:5001/api/protectedRoutes/logout");
    } catch (error) {
      console.error("Error logging out:", error);
    }
    navigate("/"); // Redirect to login page after logout
  };
  // useEffect(() => {
  //   verifySession();
  // }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      <Timer />
      <h1>This is home component.</h1>
      <button
        onClick={handleSubmit}
        type="submit"
        className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Logout
      </button>
      <button
        onClick={verifySession}
        type="submit"
        className="w-full text-white bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Verify
      </button>
    </div>
  );
}
