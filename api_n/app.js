const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const cors = require('cors');
const { eAdmin } = require('./middlewares/auth');
const Usuario = require('./models/Usuario');


app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

//const db = require("./models/db");

app.get('/usuarios', eAdmin, function (req, res){
    return res.json({
        erro: false,
        messagem: "Listar usuários!"
    });
});

app.post('/usuario', async (req, res) => {
    var dados = req.body;
    dados.senha = await bcrypt.hash(dados.senha, 8);

    await Usuario.create(dados).then(function() {
        return res.json({
            erro: false,
            messagem: "Usuário cadastrado com sucesso!"
        });
    }).catch(function(){
        return res.json({
            erro: true,
            messagem: "Erro: Usuário não foi cadastrado!"
        });
    });
    /*return res.json({
        dados: req.body
    });*/
});

app.post('/login', function (req, res){
    //console.log(req.body);
    if(req.body.usuario === 'danielsapup3@gmail.com' && req.body.senha === '1234567'){
        const { id } = 1;
        var privateKey = process.env.SECRET;
        var token = jwt.sign({id}, privateKey, {
            //expiresIn: 600 //10 min
            expiresIn: '7d' //7 dias
        })

        return res.json({
            erro: false,
            messagem: "Login válido",
            token
        });
    }
    return res.json({
        erro: true,
        messagem: "Login ou senha incorreto"
    });
});


app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});