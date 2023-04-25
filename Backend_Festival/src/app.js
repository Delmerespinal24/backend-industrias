import express from "express";
import morgan from "morgan";
import bodyParser from 'body-parser';
import cors from "cors";
import path from 'path';
import webpush from 'web-push';



// Routes
import signupAdminRoutes from "./routes/signupAdmin.routes";
import signInRoutes from "./routes/signIn.routes";
import paymentPlanRoutes from "./routes/paymentPlan.routes";
import userDataRoutes from  "./routes/userData.routes";
import machineryRoutes from "./routes/machinery.routes";
import filterRoutes from "./routes/filter.routes";
import purchaseRoutes from "./routes/compra.routes";
import imagesRoutes from "./routes/images.routes"
import signInSaasRoutes from "./routes/signInSaas.routes";


const pat = require('path')
const app = express();
const fs = require('fs');
const https = require('https')

const key = fs.readFileSync('private.key');
const cert = fs.readFileSync('certificate.crt');

const cred={
    key,
    cert
}

//VAPID KKEY PARA PUSH NOTIFICATIONS
const vapidKeys = {
    "publicKey": "BM5vCPcH8UEt3K_Ax2ClC8slDubhJQBOfQC4tBO-R_IqnyGfzlGWq-F-tvYDOx_JaiU348Vil3-NeiIK6bIcNlI",
    "privateKey": "GESPyrj_tftKb7LYDvUMmMv2OMe0s-9pPDI3kTeS20o"
}

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const handlerResponse = (res, message) => {
    res.status(200).json({
      message,
    });
  };
  

//CONTROLADORES PARA PUSH NOTIFICATION
const savePush =(req, res)=>{
    const name = Math.floor(Date.now()/1000);

    let tokenBrowser = req.body.token;

    let data = JSON.stringify(tokenBrowser, null, 2);

    fs.writeFile(`./src/tokens/token-${name}.json`,data, (err)=>{
        if (err) throw err;
        handlerResponse(res,'save success')
    })

}

const sendPush = (req, res) => {
    const dias = req.body.dias;
  
    const payload = {
      notification: {
        title: "ATLAS",
        body: `Recordatorio que le quedan ${dias} días antes del vencimiento de la subscripción`,
        vibrate: [100, 50, 100],
        image:
          "https://uploadgerencie.com/imagenes/obligaciones-exigibles-antes-del-vencimiento.png",
        actions: [
          {
            action: "explore",
            title: "Ir al sitio",
            url: "https://www.google.com/",
          },
        ],
      },
    };
  
    const directoryPath = path.join(__dirname, "tokens");
  
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "read error" });
      } else {
        files.forEach((file) => {
          const tokenRaw = fs.readFileSync(`${directoryPath}/${file}`);
          const tokenParse = JSON.parse(tokenRaw);
  
          webpush
            .sendNotification(tokenParse, JSON.stringify(payload))
            .then(() => {
              console.log("Enviado !!");
            })
            .catch((err) => {
              console.log("Error no tiene permiso", err);
            });
        });
  
        res.status(200).json({ message: "Se envió la notificación" });
      }
    });
  };
  

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
app.use("/purchase", purchaseRoutes);
app.use("/LoginSaas", signInSaasRoutes);

app.use("/product",imagesRoutes)

app.get('/pruebas',(req,res)=>{
    res.send({
        people:'yooo'
    })
})

app.route('/save').post(savePush);
app.route('/send').post(sendPush);

//VALIDANDO LAS CREDENCIALES HTTPS
app.get('/.well-known/pki-validation/F1A78481F104416E62F9344310BA0B8C.txt', (req,res)=>{
    const filePath = path.resolve(__dirname, '../F1A78481F104416E62F9344310BA0B8C.txt');
    res.sendFile(filePath);
  })

const httpsServer = https.createServer(cred,app);
httpsServer.listen(8443);



export default app;
