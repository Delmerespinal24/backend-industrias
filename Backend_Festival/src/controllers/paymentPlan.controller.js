
import { getConnection } from "../database/database";

const addCard = async (req, res) => {
    const pool = await getConnection();
    
    try {
       
        var tarjeta={
            noTarjeta:req.body.noTarjeta,
            fechaVencimientoT:req.body.fechaVencimientoT,
            codigoCVV:req.body.codigoCVV
        }

        var plan={
            tipoPlan:req.body.tipoPlan,
            fechaInicio : "",
            fechaFin:req.body.fechaFin,
            precio:req.body.precio,
            idUsuario:req.body.idUsuario
        }

        var status=200;
        var message;

        if (//plan.tipoPlan === undefined ||plan.fechaFin === undefined ||plan.precio === undefined ||
            tarjeta.noTarjeta === undefined || tarjeta.fechaVencimientoT === undefined || tarjeta.codigoCVV === undefined) {
             return res.status(400).json({
                 "message": "¡Advertencia! Por favor llenar todos los campos."
             });
         }

        // VALIDACIONES DE LA TARJETA DE CREDITO

        if(tarjeta.noTarjeta > 9999999999999999 || tarjeta.noTarjeta < 1000000000000000){
            return res.status(400).json({
                "message": "¡Advertencia! Numero de tarjeta invalido, revise sus datos."

            });
         }

        if(tarjeta.codigoCVV > 999 || tarjeta.codigoCVV < 100){
            return res.status(400).json({
                "message": "¡Advertencia! Codigo CVV invalido, revise sus datos."

            });
         }

        let fechaVence = new Date(tarjeta.fechaVencimientoT);

        let hoy = new Date();

        if(fechaVence<hoy){
            return res.status(400).json({
                "message": "¡Advertencia! Tarjeta de credito obsoleta."

            });
        }

       else{

         //OBTENER LA FECHAINICIO (EN QUE SE COMPRÓ EL PLAN)
         let hoy = new Date();
         let dia = hoy.getDate();
         let mes = hoy.getMonth() + 1;
         let anio = hoy.getFullYear();

        plan.fechaInicio = `${anio}-${mes}-${dia}`; 

        //INSERTAR DATOS EN PLANES
        await pool.query("INSERT INTO planes SET ?",plan); 

        var message="Pago realizado con exito!";
       }
        
        var resultado={
            status: status,
            message: message
            }
            res.status(status).json(resultado);
            return;

    } catch (error) {
       
        res.status(500);
        res.send({status: 500, message: error.message});
        return;
    }
};

export const methods = {
    addCard
    };
