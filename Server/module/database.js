const dbConfig = require('../mysql.json');

const mysqlConfig = {
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    port: dbConfig.port
}

module.exports = {
    mysqlConfig
};