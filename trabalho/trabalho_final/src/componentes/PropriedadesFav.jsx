import React from 'react';

export default function PropriedadesFav({ name, type, image }) {
    return (
        <div className="card">
            <img src={image} alt={`Imagem de ${name}`} />
            <h3>{name}</h3>
            <p>{type}</p>
        </div>
    );
}
