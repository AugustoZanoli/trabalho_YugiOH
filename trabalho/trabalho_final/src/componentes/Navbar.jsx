import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Logar</Link>
                </li>
                <li>
                    <Link to="/listar-propriedades">Cartinhas</Link>
                </li>
                <li>
                    <Link to="/favoritos">Favoritos</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
