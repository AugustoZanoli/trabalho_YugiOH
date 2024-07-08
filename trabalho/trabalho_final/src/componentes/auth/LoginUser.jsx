import React, { useEffect, useState } from 'react';
import '../../styles/CreateUser.css';
import { set, useForm } from 'react-hook-form'; //npm i react-hook-form
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';

// Objeto para validação de campos com yup
const schema = yup.object({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().min(2, 'Senha com no mínimo 2 caracteres').required(),
}).required();

export default function LoginUser() {

    // Msg para armazenar resposta literal do servidor
    const [msg, setMsg] = useState(' ');

    const form = useForm({
        resolver: yupResolver(schema)
    });

    const { register, handleSubmit, formState } = form;

    const { errors } = formState;

    const submit = async (data) => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', data);
            sessionStorage.setItem('token', response.data);
            setMsg('Usuário Autenticado');
        } catch (error) {
            setMsg(error.response.data);
        }
    }

    if (msg.includes('Usuário Autenticado')) {
        return <Navigate to='/listar-propriedades' />
    }

    return (
        <>
            <img id='logoYugi'src="../src/assets/logo-main.png" alt="yugioh logo" />
            <p>Bem vindo ao Yugi-OH deck manager</p>
            <form onSubmit={handleSubmit(submit)} noValidate >

                <label htmlFor="email" placeholder="email">Email</label>
                <input type="text" id="email" {...register('email')} />
                <p className='erro'>{errors.email?.message}</p>

                <label htmlFor="password">Senha</label>
                <input type="password" id="password" {...register('password')} />
                <p className='erro'>{errors.password?.message}</p>

                <button>Entrar</button>
            </form>
            <p className="server-response">{msg}</p>
            <div className="realizar-cadastro">
                Não possui conta? 
                <Link to="/criar-user">Faça o seu cadastro</Link>
            </div>
        </>
    )
}
