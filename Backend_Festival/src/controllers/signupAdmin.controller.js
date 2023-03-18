import { getConnection } from "../database/database";
import helpers from "../routes/helpers";


//SIGNUP AGREGAR NUEVO USUARIO ADMIN
const addUser = async (req, res) => {
  console.log(req.body)
    try {
      const {
        primerNombre,
        primerApellido,
        nombreUsuario,
        FechaNacimiento,
        correoElectronico,
        telefono,
        sexo,
        password,
        esAdmin,
      } = req.body;

      

      if (
        typeof primerNombre === 'undefined' ||
        typeof primerApellido === 'undefined' ||
        typeof nombreUsuario === 'undefined' ||
        typeof FechaNacimiento === 'undefined' ||
        typeof correoElectronico === 'undefined' ||
        typeof telefono === 'undefined' ||
        typeof sexo === 'undefined' ||
        typeof password === 'undefined' ||
        typeof esAdmin === 'undefined'
      ) {
        console.log('entra al if',req.body)
        return res.status(400).json({ message: `Por favor, llene todos los campos!. ${primerNombre}` });
      }
      
  
      const user = {
        primerNombre,
        primerApellido,
        nombreUsuario,
        FechaNacimiento,
        correoElectronico,
        telefono,
        sexo,
        password,
        esAdmin,
      };
      const connection = await getConnection();
      user.password = await helpers.encryptPassword(password);
  
      await connection.query("INSERT INTO usuarios SET ?", user);
      return res.json({ message: "User added" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  };
  
  export const methods = {
    addUser,
  };
  
