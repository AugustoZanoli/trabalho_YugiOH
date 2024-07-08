import axios from 'axios';
import { useEffect, useState } from 'react';
import PropriedadesFav from './PropriedadesFav';
import Navbar from './Navbar';
import '../index.css'

export default function ListaFav() {
    const [favoritos, setFavoritos] = useState([]);
    const [msg, setMsg] = useState('');

    useEffect(() => {
        async function buscaFavoritos() {
            try {
                const dado = await axios.get('http://localhost:3000/favoritos');
                setFavoritos(dado.data);
            } catch (error) {
                setMsg('Erro ao buscar favoritos');
            }
        }
        buscaFavoritos();
    }, []);

    const removeFavorite = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/favoritar/${id}`);
            if (response && response.data) {
                setMsg(response.data);
                if (response.data.includes('sucesso')) {
                    setFavoritos(favoritos.filter(fav => fav.id !== id));
                }
            } else {
                setMsg('Erro: A resposta do servidor não contém dados.');
            }
        } catch (error) {
            setMsg(error.message);
        }
    };

    const avaliarCarta = async (id, name, type, image, avaliacao) => {
        try {
            const response = await axios.put(`http://localhost:3000/favoritar/${id}`, {
                name,
                type,
                image,
                avaliacao
            });
            if (response && response.data) {
                setMsg(response.data);
                if (response.data.includes('sucesso')) {
                    // Atualiza a avaliação da carta no estado local
                    setFavoritos(favoritos.map(fav => fav.id === id ? { ...fav, avaliacao: avaliacao || fav.avaliacao } : fav));
                }
            } else {
                setMsg('Erro: A resposta do servidor não contém dados.');
            }
        } catch (error) {
            setMsg(error.message);
        }
    };

    return (
        <div>
            <Navbar />
            {msg && <p>{msg}</p>}
            <div className="lista-propriedades">
                {favoritos.map(f => (
                    <PropriedadesFav 
                        key={f.id} 
                        id={f.id}
                        name={f.name} 
                        type={f.type} 
                        image={f.image}
                        avaliacao={f.avaliacao} // Passa a avaliação como propriedade
                        onRemove={removeFavorite}
                        attAvaliacao={avaliarCarta}
                    />
                ))}
            </div>
        </div>
    );
}
