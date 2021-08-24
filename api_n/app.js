const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cors = require('cors');
const { promisify } = require('util');


app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});

app.get('/usuarios', validarToken, function (req, res){
    return res.json({
        erro: false,
        messagem: "Listar usuários!"
    });
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

// Verificar se o token é valido
async function validarToken(req, res, next){
    const authHeder = req.headers.authorization;
    const [ , token] = authHeder.split(' ');

    if(!token){
        return res.json({
            erro: true,
            messagem: "Erro: Token não encontrado!"
        });
    }
    
    try{
        const decode = await promisify(jwt.verify)(token, process.env.SECRET);
        req.userId = decode.id;
        return next();
    }catch(err){
        return res.json({
            erro: true,
            messagem: "Erro: Token invalido!"
        });
    }
}

app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});