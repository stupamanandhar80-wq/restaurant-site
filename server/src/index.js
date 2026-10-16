import "dotenv/config";

import express from "express";
import mongoose from "mongoose";

const app = express();

const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.disable("x-powered-by");

app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    status: databaseConnected ? "ok" : "unavailable",
    message: "Saffron & Stone API",
    database: databaseConnected ? "connected" : "disconnected",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: "API route not found.",
  });
});

async function startServer() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is missing. Check server/.env.");

    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "saffron_stone",
      serverSelectionTimeoutMS: 10000,
    });

    console.log("MongoDB connected.");

    app.listen(PORT, "127.0.0.1", () => {
      console.log(`API running at http://127.0.0.1:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.name);
    console.error(error.message);

    console.log("Detailed connection reason:");
    console.dir(error.reason, { depth: 5 });

    if (error.cause) {
      console.error("Underlying cause:", error.cause);
    }

    process.exit(1);
  }
}

startServer();
