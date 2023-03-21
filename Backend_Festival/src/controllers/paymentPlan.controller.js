
import { getConnection } from "../database/database";

const addCard = async (req, res) => {
    const pool = await getConnection();
    //await pool.query('start transaction')
    try {
       
        var tarjeta={
            noTarjeta:req.body.noTarjeta,
            fechaVencimientoT:req.body.fechaVencimientoT,
            codigoCVV:req.body.codigoCVV
        }

        var status=200;
        var message;

        if (tarjeta.noTarjeta === undefined || tarjeta.fechaVencimientoT === undefined || tarjeta.codigoCVV === undefined) {
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
