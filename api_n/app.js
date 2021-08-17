const express = require('express');
const app = express();

app.get('/', function (req, res){
    res.send('Olá, Mundo!');
});

app.listen(8080);