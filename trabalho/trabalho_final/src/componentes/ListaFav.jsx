import axios from 'axios';
import { useEffect, useState } from 'react';
import PropriedadesFav from './PropriedadesFav';

export default function ListaFav() {
    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        async function buscaFavoritos() {
            const dado = await axios.get('http://localhost:3000/favoritos');
            setFavoritos(dado.data);
        }
        buscaFavoritos();
    }, []);

    return (
        <div className="lista-propriedades">
            {
                favoritos.map(f => (
                    <PropriedadesFav 
                        key={f.id} 
                        name={f.name} 
                        type={f.type} 
                        image={f.image} 
                    />
                ))
            }
        </div>
    );
}
