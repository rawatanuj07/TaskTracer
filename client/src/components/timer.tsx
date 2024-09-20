import React, { useState } from "react";
import { useStopwatch } from "react-timer-hook";
import axios from "axios";

export default function Timer() {
  const [isTracking, setIsTracking] = useState(false);

  // Initialize the stopwatch
  const { seconds, minutes, hours, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  // Handle the toggle for start/stop
  const handleToggle = () => {
    if (!isTracking) {
      // Start the stopwatch
      setIsTracking(true);
      const startTime = new Date().toLocaleTimeString();
      console.log(`Start time: ${startTime}`);

      // Start the stopwatch
      start();

      // Start tracking (send data to server or store locally)
      axios
        .post("http://localhost:3000/start-tracking", { userId: 1 })
        .then((response) => {
          console.log("Tracking started", response.data);
        })
        .catch((error) => {
          console.error("Error starting tracking:", error);
        });
    } else {
      // Stop the stopwatch
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      const stopTime = new Date().toLocaleTimeString();
      console.log(
        `Stop time: ${stopTime}, Total duration: ${totalSeconds} seconds`
      );

      reset(0, false); // Reset the stopwatch to 0

      // Stop tracking (send data to server or store locally)
      axios
        .post("http://localhost:3000/stop-tracking", { logId: 1, totalSeconds })
        .then((response) => {
          console.log("Tracking stopped", response.data);
        })
        .catch((error) => {
          console.error("Error stopping tracking:", error);
        });

      setIsTracking(false); // Set tracking state to false
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">This is timer component</h1>

      {/* Display the stopwatch */}
      <div style={{ fontSize: "48px", marginBottom: "20px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>

      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          checked={isTracking}
          onChange={handleToggle}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
        <span className="ml-3 text-md font-medium text-orange-300 dark:text-orange-500">
          {isTracking ? "Tracking..." : "Teal"}
        </span>
      </label>
    </div>
  );
}
