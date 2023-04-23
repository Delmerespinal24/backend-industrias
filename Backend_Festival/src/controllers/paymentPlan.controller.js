
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

/////////////////////////////////////////////////////////////////////////////////////////////7
        const rows1 = await pool.query('SELECT * FROM planes WHERE idUsuario = ?', [plan.idUsuario])

         //OBTENER LA FECHAINICIO (EN QUE SE COMPRÓ EL PLAN)
        let hoy1 = new Date();
        let dia = hoy1.getDate();
        let mes = hoy1.getMonth() + 1;
        let anio = hoy1.getFullYear();

       plan.fechaInicio = `${anio}-${mes}-${dia}`; 

        if(rows1.length != 0 ){

            
            await pool.query("UPDATE planes SET ? WHERE idUsuario = ?", [plan, plan.idUsuario]);
            
            var resultado={
                status: 200,
                message: "Pago realizado con exito, plan actualizado"
                }
                res.status(status).json(resultado);
                return;

        }


/////////////////////////////////////////////////////////////////////////////////////////////////////////
       else{

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
