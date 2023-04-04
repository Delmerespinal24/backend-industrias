import { getConnection } from "./../database/database";
//import helpers from "./../routes/helpers";
const helpers = require('../routes/helpers');
const service = require('../services')

const userData = async (req, res) => {
    try {
        const {token} = req.body;

        const pool = await getConnection();
        
        const rows = await pool.query('SELECT idUsuario ,primerNombre, primerApellido, nombreUsuario, fechaNacimiento, correoElectronico,'
            +'telefono, sexo, esAdmin FROM usuarios WHERE idUsuario = ?', service.decryptToken(token).sub);

        if (rows.length > 0) {
            const user = rows[0];
        
            res.status(200).json({status: 200, message: "Datos del usuario obtenidos", data:rows})

        } else {
            res.status(400).json({status: 400, message: "Este usuario no existe"})
        }
        
    } catch (error) {
        res.status(500);
        res.send({status: 500, message: error.message});
    }

}

export const methods = {
userData
};