import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from "cors";

// Routes
import signupAdminRoutes from "./routes/signupAdmin.routes";
import signInRoutes from "./routes/signIn.routes";
import paymentPlanRoutes from "./routes/paymentPlan.routes";

const app = express();


// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());


// Routes
app.use("/signupAdmin", signupAdminRoutes);
app.use("/login", signInRoutes);
app.use("/paymentPlan", paymentPlanRoutes);

export default app;
