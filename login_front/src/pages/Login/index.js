import React, { useState } from 'react';

import axios from 'axios';
import { api } from '../../config/configApi';

export const Login = () => {

    const [dadosUsuario, SetUsuario] = useState({
        usuario: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        type: '',
        messagem: ''
    });

    const valorInput = e => SetUsuario({ ...dadosUsuario, [e.target.name]: e.target.value});

    const loginSubmit = async e => {
        e.preventDefault();
        console.log(dadosUsuario.usuario);
        console.log(dadosUsuario.senha);

        const headers = {
            'Content-Type': 'application/json'
        };

        axios.post(api + "/login", dadosUsuario, {headers})
        .then((response) => {
            console.log(response.data.erro);
            console.log(response.data.messagem);
            console.log(response.data.token);
            if(response.data.erro){
                setStatus({
                    type: 'erro',
                    messagem: response.data.messagem
                });
            } else {
                setStatus({
                    type: 'success',
                    messagem: response.data.messagem
                });
            }
        }).catch(() => {
            setStatus({
                type: 'erro',
                messagem: "Erro: Usuário ou senha incorreta!"
            });
        });
    };

    return (
        <div>
            <h1>Login</h1>

            {status.type === 'erro'? <p>{status.messagem}</p> : ""}
            {status.type === 'success'? <p>{status.messagem}</p> : ""}

            <form onSubmit={loginSubmit}>
                <label>Usuário: </label>
                <input type="text" name="usuario" placeholder="Digite o usuário" onChange={valorInput} /><br /><br />

                <label>Senha: </label>
                <input type="password" name="senha" placeholder="Digite a senha" onChange={valorInput} /><br /><br />

                <button type="submit">Acessar</button>
            </form>
        </div>
    );
}