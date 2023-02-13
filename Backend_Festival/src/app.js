import express from "express";
import morgan from "morgan";

// Routes
//import signupRoutes from "./routes/signup.routes";

const app = express();

// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
//app.use("/signup", signupRoutes);

export default app;
