const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const courseRoutes = require("./routes/courseRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const progressRoutes = require("./routes/progressRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();

const app = express();
const frontendProjectPath = path.join(__dirname, "PROJECT");
const frontendBuildPath = path.join(__dirname, "PROJECT", "dist");
const frontendIndexPath = path.join(frontendBuildPath, "index.html");

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(express.static(frontendBuildPath));
app.get(/^\/(?!api\/).*/, (req, res) => {
  if (!fs.existsSync(frontendIndexPath)) {
    return res.status(503).json({
      message:
        "Frontend build is missing. Run `npm run build:frontend` before starting the server.",
    });
  }

  res.sendFile(frontendIndexPath);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Server error",
  });
});

const PORT = process.env.PORT || 5050;

const ensureFrontendBuild = () => {
  if (fs.existsSync(frontendIndexPath)) {
    return;
  }

  console.log("Frontend build not found. Building PROJECT for static serving...");
  execSync("npm install && npm run build", {
    cwd: frontendProjectPath,
    stdio: "inherit",
    shell: true,
  });
};

const startServer = async () => {
  ensureFrontendBuild();
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
