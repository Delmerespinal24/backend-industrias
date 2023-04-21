import { getConnection } from "./../database/database";

const getMachineryFilter= async (req, res) => {
    try {
        var status = 200;
        var message = "Maquinas filtradas encontradas";
        var result;
        var resultado;
        //const {idMaquina} = req.body
        const {nombre, TipoMaquina, marca, pais, precioMinimo, precioMaximo} = req.body;

        const connection = await getConnection();
        result = `SELECT * from maquina WHERE marca =?`;
        
        if(nombre === "" && TipoMaquina === "" && marca === "" && pais === "" && precioMinimo === "" && precioMaximo === ""){
            resultado = await connection.query(result,[marca]);

        } else {

            if(nombre !== "" && nombre !== null){
                result = result.concat(" ", `AND nombre LIKE '%${nombre}%'`);
            }

             if(TipoMaquina !== "" && TipoMaquina !== null){
                 result = result.concat(" ", `AND TipoMaquina = "${TipoMaquina}"`);
             }

             //if(marca !== "" && marca !== null){
               // result = result.concat(" ", `AND marca = "${marca}"`);
            // }

             if(pais !== "" && pais !== null){
                result = result.concat(" ", `AND pais = "${pais}" `);
             }

             if(precioMinimo !== "" && precioMinimo !== null){
                result = result.concat(" ", `AND precio >= ${precioMinimo} `);
             }

             if(precioMaximo !== "" && precioMaximo!= null){
                result = result.concat(" ", `AND precio <= ${precioMaximo}`);
             }
            console.log(result);
            console.log(marca);
            resultado = await connection.query(result,[marca]) ;

       } 
       if(resultado.length ==0){
        message = "No se encontraron coincidencias";
        status = 400;
       }
        res.json({status: status, message: message, resultado});
    } catch (error) {
       status = 500;
       res.json({status: status, message: error.message});
    }
};

export const methods = {
    getMachineryFilter
};