import React, { useState, useContext } from 'react';
import { Context } from '../../Context/AuthContext';

import api from '../../config/configApi';

export const Login = () => {

    const {authenticated} = useContext(Context);

    console.log("Situação:" + authenticated);

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

        api.post("/login", dadosUsuario, {headers})
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
                // Salva o token no LocalStorage
                localStorage.getItem('token', JSON.stringify(response.data.token));
                api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
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
            {/*Titulo da Página*/}
            <h1>Login</h1>

            {status.type === 'erro'? <p>{status.messagem}</p> : ""}
            {status.type === 'success'? <p>{status.messagem}</p> : ""}

            <form onSubmit={loginSubmit}>
                <label>Usuário: </label>
                <input type="text" name="usuario" placeholder="Digite o usuário" onChange={valorInput} /><br /><br />

                <label>Senha: </label>
                <input type="password" name="senha" placeholder="Digite a senha" autoComplete="on" onChange={valorInput} /><br /><br />

                <button type="submit">Acessar</button>
            </form>
        </div>
    );
}