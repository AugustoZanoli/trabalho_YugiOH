import axios from 'axios';
import React, { useState } from 'react';

export default function Propriedade({ name, type, image }) {
    const [msg, setMsg] = useState('');
    const [favoritado, setFavoritado] = useState(false);

    // Criando a função que será usada no botão
    const submit = async (data) => {
        console.log('Dados enviados:', data);
        try {
            const response = await axios.post('http://localhost:3000/favoritar', data);
            if (response && response.data) {
                setMsg(response.data);
                if (response.data.includes('sucesso')) {
                    setFavoritado(true);
                }
            } else {
                // Tratar o caso em que a resposta não tem a propriedade 'data'
                setMsg('Erro: A resposta do servidor não contém dados.');
            }
        } catch (error) {
            // Tratar o erro aqui
            setMsg(error.message);
        }
    }

    return (
        // Criando meu objeto card, levando em conta os parametros da API
        <div className="card">
            <img src={image} alt={`Imagem de ${name}`} />
            <h3>{name}</h3>
            <p>{type}</p>
            <button onClick={() => submit({ name, type, image })}>
                {favoritado ? 'Favoritado' : '✩ Favoritar'}
            </button>
            {msg && <p>{msg}</p>}
        </div>
    );
}
