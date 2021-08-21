const express = require('express');
const app = express();

app.get('/', function (req, res){
    res.send('Olá, Mundo!');
});

app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});