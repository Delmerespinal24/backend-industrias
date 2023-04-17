import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from "cors";
import path from 'path';

// Routes
import signupAdminRoutes from "./routes/signupAdmin.routes";
import signInRoutes from "./routes/signIn.routes";
import paymentPlanRoutes from "./routes/paymentPlan.routes";
import userDataRoutes from  "./routes/userData.routes";
import machineryRoutes from "./routes/machinery.routes";
import filterRoutes from "./routes/filter.routes";
import purchaseRoutes from "./routes/compra.routes";

const app = express();
const fs = require('fs');

const file = fs.readFileSync('./F1A78481F104416E62F9344310BA0B8C.txt')

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
app.use("/userData", userDataRoutes);
app.use("/paymentPlan", paymentPlanRoutes);
app.use("/machinery", machineryRoutes);
app.use("/filter", filterRoutes);
app.use("/purchase", purchaseRoutes)
app.get('/prueba',(req,res)=>{
    res.send({
        people:'yooo'
    })
})
app.get('/.well-known/pki-validation/F1A78481F104416E62F9344310BA0B8C.txt', (req,res)=>{
    const filePath = path.resolve(__dirname, '../Backend_Festival/F1A78481F104416E62F9344310BA0B8C.txt');
    res.sendFile(filePath);
  })


export default app;
