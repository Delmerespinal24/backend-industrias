import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from "cors";

// Routes
import signupAdminRoutes from "./routes/signupAdmin.routes";
import signInRoutes from "./routes/signIn.routes";
import paymentPlanRoutes from "./routes/paymentPlan.routes";
import userDataRoutes from  "./routes/userData.routes";
import machineryRoutes from "./routes/machinery.routes";
import filterRoutes from "./routes/filter.routes";
import purchaseRoutes from "./routes/compra.routes";
import imagesRoutes from "./routes/images.routes"

const pat = require('path')
const app = express();


// Settings
app.set("port", 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(pat.join(__dirname,'ImagenesMaquinaria')))


// Routes
app.use("/signupAdmin", signupAdminRoutes);
app.use("/login", signInRoutes);
app.use("/userData", userDataRoutes);
app.use("/paymentPlan", paymentPlanRoutes);
app.use("/machinery", machineryRoutes);
app.use("/filter", filterRoutes);
app.use("/purchase", purchaseRoutes)
app.use("/product",imagesRoutes)


export default app;
