const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// === Core middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// === Dev CORS (React dev runs at 5173)
app.use(
  cors()
);

// === Your routes (switch to API paths)
const inventoryRoute = require("./routes/inventoryRoute"); // update these files to send JSON
const accountRoute = require("./routes/accountRoute");     // example if you have it
// mount under /api/*
app.use("/inv", inventoryRoute);
app.use("/account", accountRoute);

// Health checkg
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// === 404 (API style)
app.use((req, res, next) => {
  res.status(404).json({ error: "Error", path: req.originalUrl });
});

// === Error handler (API style)
app.use((err, req, res, _next) => {
  console.error(`Error at "${req.originalUrl}":`, err.message);
  const code = err.status || 500;
  res.status(code).json({
    error: code === 404 ? err.message : "Server error",
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

if (process.env.NODE_ENV === "development") {
  console.log("Running in development mode");
  const clientDist = path.join(__dirname, "..", "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => res.sendFile(path.join(clientDist, "index.html")));
}


// === Boot
const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
app.listen(port, () => console.log(`API listening on http://${host}:${port}`));