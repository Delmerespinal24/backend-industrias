import mysql from "promise-mysql";
const {createPool} = require("mysql");


/**const connection = mysql.createPool({
    host: 'us-cdbr-east-06.cleardb.net',
    database: 'heroku_e5d21050978e11a',
    user: 'b2dc2d5400bd1d',
    password: 'df3d6f32'
});*/

const connection = mysql.createConnection({
    host: 'database-festival.czuseyrifle7.us-east-1.rds.amazonaws.com',
    database: 'festival',
    user: 'admin',
    password: 'Festival123'
});

const getConnection = () => {
    return connection;
};

module.exports = {
    getConnection
};



