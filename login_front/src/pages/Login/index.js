import React, { useState } from 'react';

export const Login = () => {

    const [dadosUsuario, SetUsuario] = useState({
        usuario: '',
        senha: ''
    });

    const valorInput = e => SetUsuario({ ...dadosUsuario, [e.target.name]: e.target.value});

    const loginSubmit = async e => {
        e.preventDefault();
        console.log(dadosUsuario.usuario);
        console.log(dadosUsuario.senha);
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={loginSubmit}>
                <label>Usuário: </label>
                <input type="text" name="usuario" placeholder="Digite o usuário" onChange={valorInput} /><br /><br />

                <label>Usuário: </label>
                <input type="password" name="senha" placeholder="Digite a senha" onChange={valorInput} /><br /><br />

                <button type="submit">Acessar</button>
            </form>
        </div>
    );
}