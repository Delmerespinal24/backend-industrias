import mysql from "promise-mysql";
const {createPool} = require("mysql");


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



