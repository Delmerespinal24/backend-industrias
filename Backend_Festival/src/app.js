import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from "cors";

// Routes
import signupAdminRoutes from "./routes/signupAdmin.routes";

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


export default app;
