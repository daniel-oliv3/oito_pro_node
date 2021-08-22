const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.json());

app.get('/usuarios', function (req, res){
    res.json({
        erro: false,
        menssagem: "Listar usuários!"
    });
});

app.post('/login', function (req, res){
    //console.log(req.body);
    if(req.body.usuario === 'danielsapup3@gmail.com' && req.body.senha === '1234567'){
        const { id } = 1;
        var privateKey = 'cfa271b219251df7d1c8';
        var token = jwt.sign({id}, privateKey, {
            expiresIn: 600 //10 min
        })

        res.json({
            erro: false,
            menssagem: "Login válido",
            token
        });
    }
    res.json({
        erro: true,
        menssagem: "Login ou senha incorreto"
    });
});

app.listen(8080, function(){
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});