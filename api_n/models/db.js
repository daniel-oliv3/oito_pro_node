const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('oito_base_dados', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

/*sequelize.authenticate().then(function(){
    console.log("Conexão com o banco de dados realizada com sucesso!");
}).catch(function(err){
    console.log("Erro: Conexão com o banco de dados não foi realizada!");
});*/

module.exports = sequelize;