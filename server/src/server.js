const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fs = require("fs");
require("dotenv").config();

const app = express();

// --- Core middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// --- API routes ---
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/accountRoute");
app.use("/api/inv", inventoryRoute);
app.use("/api/account", accountRoute);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- Serve React build ---
const clientDist = path.join(__dirname, "../../client/dist"); // adjust if your structure is different
console.log("Serving React from:", clientDist);
console.log("index.html exists:", fs.existsSync(path.join(clientDist, "index.html")));

// Serve static assets
app.use(express.static(clientDist));

// SPA fallback: any other GET → index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// --- Error handler ---
app.use((err, req, res, _next) => {
  console.error(`Error at "${req.originalUrl}":`, err.message);
  const code = err.status || 500;
  res.status(code).json({
    error: code === 404 ? err.message : "Server error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// --- Boot ---
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
