import { getConnection } from "./../database/database";


const addMachine = async (req, res) => {
    const pool = await getConnection();
    // await pool.beginTransaction();
    await pool.query('start transaction')
    try {
        
         var machine = {
            nombre: req.body.nombre,
            descripcion : req.body.descripcion,
            TipoMaquina : req.body.TipoMaquina,
            marca : req.body.marca,
            pais : req.body.pais,
            precio : req.body.precio,
            existencia : req.body.existencia,
            image_1 : req.body.image_1,
            image_2 : req.body.image_2,
            image_3 : req.body.image_3
        }


        var status=200;
        var message="Maquina agregada con éxito";

        if (machine.nombre === undefined || machine.descripcion === undefined || machine.TipoMaquina === undefined 
            || machine.marca === undefined || machine.pais === undefined || machine.precio === undefined || machine.existencia=== undefined) {
             return res.status(400).json({
                 "message": "¡Advertencia! Por favor llenar todos los campos."
             });
         }
        
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
        await pool.query('rollback')
        res.status(500);
        res.send({status: 500, message: error.message});
        return;
    }
}


/*******************************************************************************************************/
// get para traer todas las maquinas existentes

const getMachinery= async (req, res) => {
    try {
        
        const connection = await getConnection();
        const resultMachinery = await connection.query(
            "SELECT maquina.idMaquina,maquina.nombre,maquina.descripcion,maquina.TipoMaquina,maquina.marca,maquina.pais, maquina.precio, maquina.existencia, maquina.image_1,maquina.image_2,maquina.image_3 FROM maquina;"
        );
       
        res.json({status:200,message: "Maquinaria encontrada",data:resultMachinery});


    } catch (error) {
    
       res.status(500);
       res.send({status: 500, message: error.message});
    }
};


/*******************************************************************************************************/
// get para traer una maquina especifica por id

const getMachine= async (req, res) => {
    const connection = await getConnection();
    try {
        const { idMaquina } = req.params;
        var status=200;
        var message="Maquina obtenida con éxito";

        const rows = await connection.query('SELECT * FROM maquina WHERE idMaquina = ?' , [idMaquina]);
        if(rows.length == 0){
            status=400;
            message="¡Advertencia! La maquina no existe";

            var resultado={
                status: status,
                message: message
                }
                res.status(status).json(resultado);
        }
        else{

        const resultMachine = await connection.query("SELECT * FROM maquina WHERE idMaquina = ?",[idMaquina]);

        res.json({status:200,message,data:resultMachine});
            
        //await connection.query("SELECT * FROM maquina WHERE idMaquina = ?",[idMaquina]);
            
        }

    } catch (error) {
        res.status(500);
        res.send({status: 500, message: error.message});
    }
};



/*******************************************************************************************************/

const updateMachine = async (req, res) => {
    const connection = await getConnection();
    //var idMaquina= req.params;
    try {
   
        const {idMaquina}= req.params;
        var machine = {
            nombre: req.body.nombre,
            descripcion : req.body.descripcion,
            TipoMaquina : req.body.TipoMaquina,
            marca : req.body.marca,
            pais : req.body.pais,
            precio : req.body.precio,
            existencia : req.body.existencia,
            image_1 : req.body.image_1,
            image_2 : req.body.image_2,
            image_3 : req.body.image_3
        }

        var status=200;
        var message="Maquina actualizada con éxito";
         
        const rows = await connection.query('SELECT * FROM maquina WHERE idMaquina = ?' , [idMaquina]);

        if(rows.length === 0){
            status=400;
            message="¡Advertencia! La maquina no existe";
        }else{
            
            await connection.query("UPDATE maquina SET ? WHERE idMaquina = ?", [machine, idMaquina]);
                
        }
     
            var resultado={
                status: status,
                message: message
            }
            res.status(status).json(resultado);
        
        
    } catch (error) {
        res.status(500);
        res.send({status: 500, message: error.message});
    }
};

/*******************************************************************************************************/

const deleteMachine = async (req, res) => {
    const connection = await getConnection();
    try {
        const { idMaquina } = req.params;
        var status=200;
        var message="Maquina eliminada con éxito";

        const rows = await connection.query('SELECT * FROM maquina WHERE idMaquina = ?' , [idMaquina])
        //console.log(rows);
        if(rows.length == 0){
            status=400;
            message="¡Advertencia! La maquina no existe";
        }
        else{
            
        await connection.query("DELETE FROM maquina WHERE idMaquina = ?",[idMaquina]);
            
        }

        var resultado={
            status: status,
            message: message
            }
            res.status(status).json(resultado);

    } catch (error) {
        res.status(500);
        res.send({status: 500, message: error.message});
    }
};

/*******************************************************************************************************/
// get para traer todas las maquinas existentes por marca

const getMachineryxbrand= async (req, res) => {
    const connection = await getConnection();
    try {
        const { marca } = req.params;
        //const connection = await getConnection();
        var status;
        var message;

        console.log(marca);

        const rows1 = await connection.query('SELECT * FROM maquina WHERE marca = ?', [marca])
        //console.log(rows.length)

        if(rows1.length == 0){
            status=400;
            message="¡Advertencia! No hay maquinas de la marca " + [marca] ;

            var resultado={
                status: status,
                message: message
                }
                res.status(status).json(resultado);
            
        }

        else{
        const resultMachinery = await connection.query(
            "SELECT maquina.idMaquina,maquina.nombre,maquina.descripcion,maquina.TipoMaquina,maquina.marca,maquina.pais, maquina.precio, maquina.existencia, maquina.image_1,maquina.image_2,maquina.image_3 FROM maquina WHERE marca=?",[marca]);
       
        status=200;
        res.json({status,message: "Maquinaria "+ [marca] +" encontrada",data:resultMachinery});
    } 

    }catch (error) {
    
       res.status(500);
       res.send({status: 500, message: error.message});
    }
};


export const methods = {
    addMachine,
    getMachinery,
    updateMachine,
    deleteMachine,
    getMachineryxbrand,
    getMachine
   // getAvailableProperties,
    //updateProperty,
    //updateUserProperty,
    //deleteProperty,
    //getUserProperties,
    //getUserActiveProperties,
    //addFavoriteProperty,
    //deleteFavoriteProperty,
    //getUserFavoriteProperties,
    //getAvailableClientProperties,
    //updatePropertyReservationState,
    //getPropertyByIdPropiedad
};