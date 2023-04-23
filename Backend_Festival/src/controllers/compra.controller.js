import { getConnection } from "./../database/database";

const addPurchase = async (req, res) => {
    const pool = await getConnection();
    // await pool.beginTransaction();
    await pool.query('start transaction')
    try {
        var compra = {
            idUsuario : req.body.idUsuario,
            idMaquina : req.body.idMaquina,
            cantidadProducto : req.body.cantidadProducto,
            precioUnitario : 0,
            subTotal: 0,
            impuesto: 0,
            total : 0,
            fecha : ""
            
        }

        var tarjeta={
            noTarjeta:req.body.noTarjeta,
            fechaVencimientoT:req.body.fechaVencimientoT,
            codigoCVV:req.body.codigoCVV
        }

        var status=200;
        var message;

        if ( compra.cantidadProducto === undefined || tarjeta.noTarjeta === undefined 
            || tarjeta.fechaVencimientoT === undefined || tarjeta.codigoCVV === undefined) {
             return res.status(400).json({
                 "message": "¡Advertencia! Por favor llenar todos los campos."
             });
         }

         // VALIDACION EXISTENCIA DEL PRODUCTO COMPRADO

        const existenciaProd = await pool.query('SELECT existencia FROM maquina WHERE idMaquina = ?' , [compra.idMaquina]);
         const data =JSON.parse(JSON.stringify(existenciaProd).split('"existencia"').join('"existenciaProd"'));
         const existencia = data[0].existenciaProd; 
        

        if(existencia< compra.cantidadProducto){
            return res.status(400).json({
                "message": "¡Advertencia! No hay en existencia la cantidad de producto especificado."
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
       
        else{
        
         //OBTENER PRECIO UNITARIO DE LA MAQUINA
    
         const precioUnitario = await pool.query('SELECT precio FROM maquina WHERE idMaquina = ?' , [compra.idMaquina]);
          const data =JSON.parse(JSON.stringify(precioUnitario).split('"precio"').join('"precioUnitario"'));
          const precioMaquina = data[0].precioUnitario; 
          compra.precioUnitario = precioMaquina;
         

         //CALCULAR EL SUBTOTAL
         compra.subTotal = ((compra.cantidadProducto)*(compra.precioUnitario));

         //IMPUESTO
         compra.impuesto=compra.subTotal*0.15;
         //CALCULAR EL TOTAL
         compra.total = (compra.subTotal + compra.impuesto);

         //OBTENER LA FECHA EN QUE SE HIZO LA COMPRA
         let hoy = new Date();
         let dia = hoy.getDate();
         let mes = hoy.getMonth() + 1;
         let anio = hoy.getFullYear();

         compra.fecha= `${anio}-${mes}-${dia}`; 

        //INSERTAR DATOS DE COMPRA
        await pool.query("INSERT INTO Compra SET ?",[compra]);   

        //ACTUALIZAR EXISTENCIA DE LA MAQUINA COMPRADA
        const existenciaActualizada = existencia - compra.cantidadProducto;
        await pool.query(`UPDATE maquina SET existencia = "${existenciaActualizada}" WHERE idMaquina = ?`, [compra.idMaquina]);
        // await pool.commit();
        await pool.query('commit')
       // var message="Reservacion agregada con exito!";

       
        var message="Compra realizada con exito!";
    
    }
        var resultado={
            status: status,
            message: message
            }
            res.status(status).json(resultado);
            return;

    } catch (error) {
        await pool.query('rollback')
        res.status(500);
        res.send({status: 500, message: error.message});
        return;
    }
};

export const methods = {
    addPurchase
    };
