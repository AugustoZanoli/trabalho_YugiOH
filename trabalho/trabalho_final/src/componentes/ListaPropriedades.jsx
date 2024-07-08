import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Propriedade from './Propriedade';
import Navbar from './Navbar';

export default function ListaPropriedades() {
    const [propriedades, setPropriedades] = useState([]);
    const [filtroNome, setFiltroNome] = useState('');

    useEffect(() => {
        async function buscaPropriedades() {
            const dado = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
            setPropriedades(dado.data.data);
        }
        buscaPropriedades();
    }, []);

    // Função para filtrar as cartas por nome
    const filtrarPorNome = (carta) => {
        return carta.name.toLowerCase().includes(filtroNome.toLowerCase());
    };

    return (
        <div>
            <Navbar />
            <div className="filtro-container">
                <img id='logoYugi'src="./src/assets/logo-main.png" alt="logo yugioh" />
                <input
                    type="text"
                    value={filtroNome}
                    onChange={(e) => setFiltroNome(e.target.value)}
                    placeholder="Buscar por nome..."
                />
            </div>
            <div className="lista-propriedades">
                {propriedades
                    .filter(filtrarPorNome)
                    .map((p) => (
                        <Propriedade
                            key={p.id}
                            name={p.name}
                            type={p.type}
                            image={p.card_images[0].image_url}
                        />
                    ))}
            </div>
        </div>
    );
}
