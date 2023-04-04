import { getConnection } from "./../database/database";


const addMachine = async (req, res) => {
    const pool = await getConnection();
    // await pool.beginTransaction();
    await pool.query('start transaction')
    try {
        var typeMachine = {
            tipoMaquina : req.body.tipoMaquina
            
        }
        var brandMachine = {
            marca : req.body.marca,
            pais : req.body.pais
            
        }
        var machine = {
            nombre: req.body.nombre,
            descripcion : req.body.descripcion,
            precio : req.body.precio,
            existencia : req.body.existencia,
            //tipoMaquina : req.body.tipoMaquina,
            //marca : req.body.marca,
            //pais : req.body.pais
            image_1 : req.body.image_1,
            image_2 : req.body.image_2,
            image_3 : req.body.image_3
        }


        var status=200;
        var message="Maquina agregada con éxito";

        if (typeMachine.tipoMaquina === undefined || brandMachine.marca === undefined || brandMachine.pais === undefined 
            || machine.nombre === undefined || machine.descripcion === undefined || machine.precio === undefined 
            || machine.existencia=== undefined) {
             return res.status(400).json({
                 "message": "¡Advertencia! Por favor llenar todos los campos."
             });
         }
         //console.log("paso1");
        await pool.query("INSERT INTO tipoMaquina SET ?",typeMachine);
        
        //console.log("paso2");
          const lastId = await pool.query("SELECT LAST_INSERT_ID()");
          const data =JSON.parse(JSON.stringify(lastId).split('"LAST_INSERT_ID()"').join('"id"'));
          const id_TipoMaquina = data[0].id;

        // // Se agrega el elemento al objeto machine
         machine.idTipoMaquina = id_TipoMaquina;

         //Repetimos proceso para la marca
         await pool.query("INSERT INTO marca SET ?",brandMachine);
        
        //console.log("paso2");
          const lastId1 = await pool.query("SELECT LAST_INSERT_ID()");
          const data1 =JSON.parse(JSON.stringify(lastId).split('"LAST_INSERT_ID()"').join('"id"'));
          const id_Marca = data[0].id;

        // // Se agrega el elemento al objeto machine
         machine.idMarca = id_Marca;

        //INSERCION DE MAQUINARIA
        await pool.query("INSERT INTO maquina SET ?", machine);
        // await pool.commit();
        await pool.query('commit')
          

        var resultado={
            status: status,
            message: message
            }
            res.status(status).json(resultado);
            return;

    } catch (error) {
        const pool = await getConnection();
        // await pool.rollback();
        await pool.query('rollback')
        res.status(500);
        res.send({status: 500, message: error.message});
        //await pool.rollback();
        return;
    }
}


/*******************************************************************************************************/
// get para traer todas las maquinas existentes

const getProperty= async (req, res) => {
    try {
        
        const connection = await getConnection();
        const resultProperty = await connection.query(
            "SELECT propiedad.idUsuario,propiedad.idPropiedad,tipopropiedad.tipoPropiedad, tipopropiedad.tipoEspacio,propiedad.titulo, propiedad.descripcion, propiedad.direccion,propiedad.estado,propiedad.reservacion,tipopropiedad.idTipoPropiedad, tipopropiedad.cantidadHuespedes,tipopropiedad.numHabitaciones,tipopropiedad.cantidadBanios, tipopropiedad.estacionamiento, tipopropiedad.internet,tipopropiedad.aireAcondicionado, propiedad.idPropiedad, propiedad.precioPorNoche,propiedad.inicioFechaDisponible,propiedad.finFechaDisponible, propiedad.image_1, propiedad.image_2,propiedad.image_3 FROM tipopropiedad INNER JOIN propiedad ON tipopropiedad.idTipoPropiedad = propiedad.idTipoPropiedad;"
        );
       
        res.json({status:200,message: "Propiedades encontradas",data:resultProperty});


    } catch (error) {
    
       res.status(500);
       res.send({status: 500, message: error.message});
    }
};



/*******************************************************************************************************/

const updateMachine = async (req, res) => {
    const connection = await getConnection();
    // await connection.beginTransaction();
    await connection.query('start transaction')
    try {
   
        var typeMachine = {
            idTipoMaquina : req.body.idTipoMaquina,
            tipoMaquina : req.body.tipoMaquina
            
        }
        var brandMachine = {
            idMarca : req.body.idMarca,
            marca : req.body.marca,
            pais : req.body.pais
            
        }
        var machine = {
            idMaquina : req.body.idMaquina,
            idMarca : req.body.idMarca,
            idTipoMaquina : req.body.idTipoMaquina,
            nombre: req.body.nombre,
            descripcion : req.body.descripcion,
            precio : req.body.precio,
            existencia : req.body.existencia,
            //tipoMaquina : req.body.tipoMaquina,
            //marca : req.body.marca,
            //pais : req.body.pais
            image_1 : req.body.image_1,
            image_2 : req.body.image_2,
            image_3 : req.body.image_3
        }


        //const connection = await getConnection();
        var status=200;
        var message="Maquina actualizada con éxito";

        const rows = await connection.query('SELECT * FROM maquina WHERE idMaquina = ?' , [machine.idMaquina]);
        if(rows.length === 0){
            status=400;
            message="¡Advertencia! La maquina no existe";
        }else{
            
            await connection.query("UPDATE tipoMaquina SET ? WHERE idTipoMaquina = ?", [typeMachine, typeMachine.idTipoMaquina]);
            await connection.query("UPDATE marca SET ? WHERE idMarca = ?", [brandMachine, brandMachine.idMarca]);
            await connection.query("UPDATE maquina SET ? WHERE idMaquina = ?", [machine, machine.idMaquina]);
            // await connection.commit();
            await connection.query('commit')
                
        }
     
            var resultado={
                status: status,
                message: message
            }
            res.status(status).json(resultado);
        
        
    } catch (error) {
        // await connection.rollback();
        await connection.query('rollback')
        res.status(500);
        res.send({status: 500, message: error.message});
    }
};

export const methods = {
    addProperty,
    getProperty,
    getAvailableProperties,
    updateProperty,
    updateUserProperty,
    deleteProperty,
    getUserProperties,
    getUserActiveProperties,
    addFavoriteProperty,
    deleteFavoriteProperty,
    getUserFavoriteProperties,
    getAvailableClientProperties,
    updatePropertyReservationState,
    getPropertyByIdPropiedad
};