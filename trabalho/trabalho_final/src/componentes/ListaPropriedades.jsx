import axios from 'axios';
import { useEffect, useState } from 'react';
import Propriedade from './Propriedade';
import Navbar from './Navbar';

export default function ListaPropriedades() {
    const [propriedades, setPropriedades] = useState([]);

    useEffect(() => {
        async function buscaPropriedades() {
            // Importando API ao invés de usar o banco de dados local
            const dado = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
            setPropriedades(dado.data.data);
        }
        buscaPropriedades();
    }, []);

    return (
        // Não irei usar tabela, e sim o CSS diretamente
        // Mapeando os dados de cada carta da minha API
        <div>
            <Navbar />
            <div className="lista-propriedades">
                {
                    propriedades.map(p => (
                        <Propriedade 
                            key={p.id} 
                            name={p.name} 
                            type={p.type} 
                            image={p.card_images[0].image_url} 
                        />
                    ))
                }
            </div>
        </div>
    );
}
