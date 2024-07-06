import React from 'react';

export default function PropriedadesFav({ id, name, type, image, onRemove }) {
    return (
        <div className="card">
            <img src={image} alt={`Imagem de ${name}`} style={{ width: '300px', height: '300px' }} />
            <h3>{name}</h3>
            <p>{type} </p>
            <button id='btnRemover' onClick={() => onRemove(id)}>Remover</button><button id='btnAvaliar'><span role="img" aria-label="star">
        ⭐️
    </span></button>
        </div>
    );
}
