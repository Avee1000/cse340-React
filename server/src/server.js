
const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
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
app.use("/inv", inventoryRoute);
app.use("/account", accountRoute);
app.get("/api/health", (_req, res) => res.json({ ok: true }));

// --- Serve React build in production ---
if (process.env.NODE_ENV === "production") {
  const clientDist = path.join(__dirname, "../../client/dist");
  app.use(express.static(clientDist));
  // Serve React for all non-API, non-asset routes
  app.get("*", (req, res, next) => {
    // If request is for a static asset, skip to next
    if (req.path.match(/\.(js|css|png|jpg|jpeg|svg|ico|json)$/)) return next();
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

// --- 404 handler ---
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.originalUrl });
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
const host = process.env.HOST || "localhost";
app.listen(port, () => console.log(`API listening on http://${host}:${port}`));