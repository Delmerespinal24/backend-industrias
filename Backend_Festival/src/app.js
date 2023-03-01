import express from "express";
import morgan from "morgan";

// Routes
import signupAdminRoutes from "./routes/signupAdmin.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/signupAdmin", signupAdminRoutes);

export default app;
