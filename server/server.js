const express = require("express");
const session = require("express-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();
console.log("Secret Key:", process.env.SECRET_KEY);

// const signupRoutes = require("./routes/api/userRoutes");
const userRoutes = require("../server/routes/api/userRoutes");
const loginRoutes = require("../server/routes/api/loginRoutes");
const protectedRoutes = require("../server/routes/api/protectedRoutes");
// Initialize Express app
const app = express();
// Configure CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your client's origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
const port = process.env.PORT || 5001;
const sessionStore = new session.MemoryStore(); // Create a session store

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Configure session middleware
console.log("session is started now");
app.use(
  session({
    secret: process.env.SECRET_KEY || "default_secret", // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    store: sessionStore, // Use the same session store
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // Adjust as needed (e.g., "strict" or "none" for cross-site)
      maxAge: 60000, // Set cookie expiration time
    },
  })
);
// app.use(
//   session({
//     secret: process.env.SECRET_KEY, // Replace with a strong secret key
//     resave: false,
//     saveUninitialized: false,
//     store: sessionStore, // Use the same session store

//     cookie: { secure: false, httpOnly: true }, // Set to true if using HTTPS
//     maxAge: 60000, // Set cookie expiration time
//   })
// );

// API routes
app.use("/api/userRoutes", userRoutes); // Use the signup routes
console.log("signupp is okkay now");
app.use("/api/loginRoutes", loginRoutes); // Use the signin routes
console.log("signin is okkay now");
app.use("/api/protectedRoutes", protectedRoutes); // Use the protected routes

// Serve static files (if you have a build directory for your React app)
app.use(express.static(path.join(__dirname, "client/build")));

// Fallback to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
