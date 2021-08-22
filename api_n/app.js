const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

app.get('/usuarios', function (req, res){
    return res.json({
        erro: false,
        menssagem: "Listar usuários!"
    });
});

app.post('/login', function (req, res){
    //console.log(req.body);
    if(req.body.usuario === 'danielsapup3@gmail.com' && req.body.senha === '1234567'){
        const { id } = 1;
        var privateKey = process.env.SECRET;
        var token = jwt.sign({id}, privateKey, {
            expiresIn: 600 //10 min
        })

        return res.json({
            erro: false,
            menssagem: "Login válido",
            token
        });
    }
    return res.json({
        erro: true,
        menssagem: "Login ou senha incorreto"
    });
});

app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});