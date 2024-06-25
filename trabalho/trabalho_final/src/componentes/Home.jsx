import React from 'react';
import ListaPropriedades from './ListaPropriedades';
import ListaFav from './ListaFav';


export default function Home() {
    return (
        <>
            <h2>Favoritas:</h2>
            <ListaFav />
            <hr></hr>
            <h2>Geral:</h2>
            <ListaPropriedades />
        </>
    );
}
