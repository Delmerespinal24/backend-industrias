import { Router } from "express";
import { methods as imagesController } from "./../controllers/images.controller";

const path = require('path')
const multer = require('multer')
const router = Router();

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../ImagenesMaquinaria/'),
    filename: (req, file, cb) => {
        const{id} = req.params
        let ext = file.originalname.split(".")
        ///Id del producto_Plazitanet_fecha_extension
        cb(null,id + '_festival_' + Date.now() + '.' + ext[ext.length-1])
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.post("/postImage/:id",fileUpload, imagesController.postImage);

export default router;