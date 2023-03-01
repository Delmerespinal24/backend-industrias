import { getConnection } from "../database/database";
import helpers from "../routes/helpers";


//SIGNUP AGREGAR NUEVO USUARIO ADMIN
const addUser = async (req, res) => {
    try{
        const{primerNombre,primerApellido,nombreUsuario,FechaNacimiento,correoElectronico,telefono,sexo,password,esAdmin}= req.body;

       if (primerNombre === undefined || primerApellido === undefined || nombreUsuario === undefined || FechaNacimiento === undefined
            || correoElectronico === undefined || telefono === undefined || sexo === undefined || password === undefined || esAdmin === undefined) {
           res.status(400).json({ message: "Bad Request. Please fill all field." });
        }
        
        const user = {primerNombre,primerApellido,nombreUsuario,FechaNacimiento,correoElectronico,telefono,sexo,password, esAdmin} ;
        const connection = await getConnection();
        user.password = await helpers.encryptPassword(password);

        
        await connection.query("INSERT INTO usuarios SET ?", user);
       res.json({ message: "User added" });
    
    }catch(error){
        res.status(500);
        res.send(error.message);
    }
};


export const methods = {

addUser,
};
