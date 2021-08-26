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


app.get('/usuarios', eAdmin, async function (req, res){
    await Usuario.findAll({order: [['id', 'DESC']]}).then(function(usuarios){
        return res.json({
            erro: false,
            usuarios 
        });
    }).catch(function(){
        return res.json({
            erro: true,
            messagem: "Erro: Nenhum usuário encontrado!"
        });
    });
});

app.get('/usuario/:id',eAdmin, async (req, res) => {
    await Usuario.findByPk(req.params.id).
    then(usuario => {
        return res.json({
            erro: false,
            usuario
        });
    }).catch(function(){
        return res.json({
            erro: true,
            messagem: "Erro: Usuário não encontrado!"
        });
    });
});

//Cadastrar
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
});

//Editar
app.put('/usuario', eAdmin, async (req, res) => {
    var dados = req.body;
    dados.senha = await bcrypt.hash(dados.senha, 8);

    await Usuario.update(dados, { where: {id: dados.id}}). 
    then(function(){
        return res.json({
            erro: false,
            messagem: "Usuário editado com sucesso!"
        });
    }).catch(function(){
        return res.json({
            erro: true,
            messagem: "Erro: Usuário não foi editado!"
        });
    });
});

app.post('/login', async (req, res) => {

    const usuario = await Usuario.findOne({where: {email: req.body.usuario}});
    if(usuario === null){
        return res.json({
            erro: true,
            messagem: "Erro: Usuário ou senha incorreta!"
        });
    }

    if(!(await bcrypt.compare(req.body.senha, usuario.senha))){
        return res.json({
            erro: true,
            messagem: "Erro: Usuário ou senha incorreta!"
        });
    }
   
        var token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
            //expiresIn: 600 //10 min
            expiresIn: '7d' //7 dias
        })

        return res.json({
            erro: false,
            messagem: "Login realizado com sucesso!",
            token
    });
});


app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});