import React, { useState } from 'react';

export default function PropriedadesFav({ id, name, type, image, avaliacao, onRemove, attAvaliacao }) {
    const [newAvaliacao, setNewAvaliacao] = useState(null);
    const [showInput, setShowInput] = useState(false);

    const handleAvaliar = () => {
        if (newAvaliacao) {
            attAvaliacao(id, name, type, image, newAvaliacao);
            setShowInput(false);
        } else {
            alert('Por favor, selecione uma avaliação.');
        }
    };

    return (
        <div className="card">
            <img src={image} alt={`Imagem de ${name}`} style={{ width: '300px', height: '300px' }} />
            <h3>{name}</h3>
            <p>{type}</p>
            {avaliacao && <p>Avaliação: {avaliacao}</p>}
            <button id='btnRemover' onClick={() => onRemove(id)}>Remover</button>
            <button id='btnAvaliar' onClick={() => setShowInput(!showInput)}>
                <span role="img" aria-label="star">⭐️</span>
            </button>
            {showInput && (
                <div>
                    <select onChange={(e) => setNewAvaliacao(parseInt(e.target.value))} value={newAvaliacao || ''}>
                        <option value="" disabled>Selecione uma avaliação</option>
                        {[1, 2, 3, 4, 5].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                    <button id='btnEnviarAval' onClick={handleAvaliar}>Enviar</button>
                </div>
            )}
        </div>
    );
}
