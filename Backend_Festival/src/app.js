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
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Routes
app.use("/signupAdmin", signupAdminRoutes);


export default app;
