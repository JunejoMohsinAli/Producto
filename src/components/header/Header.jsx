import React from 'react'
import './Header.css'
import logo from '../../assets/logo.svg';
import { useState } from 'react';

export default function Header() {

const [isMenuOpen, setIsMenuOpen] = useState(false);
const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  return (
    <div className="container">
        <header className="header">
    <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
    </div>
    <button className="menu-button" onClick={toggleMenu}>☰</button>
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
        <a href="#">Home</a>
        <a href="#">Producto</a>
        <button className="login-btn">Login</button>
    </nav>
</header>
    </div>
  )
}