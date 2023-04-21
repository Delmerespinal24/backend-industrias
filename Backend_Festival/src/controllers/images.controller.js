import { getConnection } from "./../database/database";


const postImage = async (req, res) => {

    try {
        const{id} = req.params
        
        let data = id.split("-")

        const name = req.file.filename

        const connection = await getConnection()

        let sql = `UPDATE maquina set ${data[1]} = '${name}' WHERE idMaquina = ${data[0]}`
        console.log(sql)

        await connection.query(sql);
        res.status(200).json({ status: 200, message: "Imagen agregada a la maquina" })

    } catch (error) {
        res.send({ status: 500, message: error.message });
    }

}

export const methods = {
    postImage
};