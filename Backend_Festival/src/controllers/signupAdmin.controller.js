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
        fotoPerfil,
        fechaCreacion
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
        typeof esAdmin === 'undefined' ||
        typeof fotoPerfil === 'undefined' 
        //typeof fechaCreacion === 'undefined'
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
        fotoPerfil,
        fechaCreacion
      };

       //OBTENER LA FECHA CREACION DE USUARIO (EN QUE SE CREO EL USUARIO)
       let hoy = new Date();
       let dia = hoy.getDate();
       let mes = hoy.getMonth() + 1;
       let anio = hoy.getFullYear();

      user.fechaCreacion = `${anio}-${mes}-${dia}`; 


      const connection = await getConnection();
      user.password = await helpers.encryptPassword(password);

      // Comprueba si existe el nombre de usuario
      const usernameExists = await connection.query("SELECT nombreUsuario from usuarios where nombreUsuario = ?", nombreUsuario);
    
      if (!usernameExists.length) {
        // Comprueba si existe el correo electronico
        const emailExists = await connection.query("SELECT correoElectronico from usuarios where correoElectronico = ?", correoElectronico);
      
        if (!emailExists.length) {
          // Comprueba si existe el número de telefono
          const phoneExists = await connection.query("SELECT telefono from usuarios where telefono = ?", telefono);
        
          if (!phoneExists.length) {
            await connection.query("INSERT INTO usuarios SET ?", user);
            res.status(200).json({status: 200, message: "Usuario añadido"})

          }else{
            res.json({status: 402, message: "El número de teléfono ya está en uso"})

          }

        }else{
          res.json({status: 401, message: "El correo electronico ya está en uso"})

        }

      }else{
        res.json({status: 400, message: "El nombre de usuario ya está en uso"})

      }

    
    } catch (error) {
      res.send({status: 500, message: error.message});
    }
  };
  
  export const methods = {
    addUser,
  };
  
