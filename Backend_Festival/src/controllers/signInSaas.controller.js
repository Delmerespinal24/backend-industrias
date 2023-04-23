import { getConnection } from "./../database/database";
const helpers = require('../routes/helpers');
const service = require('../services')

// FUNCIÓN PARA VERIFICAR LOS USUARIOS CREADOS
const signInSaas = async (req, res) => {
    try {
      
        const pool = await getConnection();
        const {nombreUsuario, password} = req.body;

        if(!(nombreUsuario && password)) {
            return  res.status(400).json({ status: 400, message: "El usuario y la contraseña son requeridos"});
        }
        
        const rows = await pool.query('SELECT idUsuario, password, esAdmin FROM usuarios WHERE nombreUsuario = ? OR correoElectronico = ?', [nombreUsuario, nombreUsuario]);


        if (rows.length > 0) {
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);


            ////////////////OPCION CUANDO SOLO ES UN UNICO ADMIN///////////////

             ///TRAER EL ID DEL USUARIO ADMIN

      /*  const id = await pool.query('SELECT idUsuario FROM usuarios WHERE asAdmin =1');
        const data =JSON.parse(JSON.stringify(id).split('"idUsuario"').join('"idUsuario"'));
        const idAdmin = data[0].idUsuario; 

        

            ///TRAER EL LA FECHA DE EXPIRACION DEL USUARIO ADMIN
        const fecha = await pool.query('SELECT fechaFin FROM planes WHERE idUsuario = ?' , [idAdmin]);
        const data1 =JSON.parse(JSON.stringify(fecha).split('"fechaFin"').join('"fechaFin"'));
        const fechaF = data1[0].fechaFin; 

*/
        ////////////////OPCION CUANDO HAY MAS DE UN ADMIN///////////////

         ///TRAER EL ID  DEL PLAN MAS RECIENTE 

         const id = await pool.query('SELECT MAX(idPlan) FROM planes');
        const data =JSON.parse(JSON.stringify(id).split('"MAX(idPlan)"').join('"idPlan"'));
        const idPlan = data[0].idPlan;
        

        ///TRAER EL LA FECHA DE EXPIRACION DEL USUARIO ADMIN
      const fecha = await pool.query('SELECT fechaFin FROM planes WHERE idPlan = ?' , [idPlan]);
        const data1 =JSON.parse(JSON.stringify(fecha).split('"fechaFin"').join('"fechaFin"'));
        const fechaF = data1[0].fechaFin; 


     let fechaFin = new Date(fechaF);
        let hoy = new Date();
        console.log(fechaF);
        console.log(hoy);

        if(fechaFin<hoy){

            return res.status(400).json({
                "message": "¡Advertencia! No puede acceder a la pagina, el plan ha expirado!!"

            });
        }
           
            if (validPassword) {
                res.status(200).send({status: 200, message: "Usted acaba de Iniciar Sesion", token: service.createToken(user), esAdmin:user.esAdmin })
                //res.status(200).json({status: 200, message: "Usted acaba de Iniciar Sesion", data:rows})
              } else {
                res.status(400).json({status: 400, message: "Contraseña Incorrecta"})
              }
        } else {
            res.status(400).json({status: 400, message: "Este usuario no existe"})
        }
        
    } catch (error) {
        res.status(500);
        res.send({status: 500, message: error.message});
    }

}

export const methods = {
signInSaas
};
    