import React from 'react'
import './Header.css'
import logo from '../../assets/logo.png';

export default function Header() {
  return (
    <>
        <header className="header">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>
            <nav className="navbar">
                <a href="#">Home</a>
                <a href="#">Producto</a>
                <button className="login-btn">Login</button>
            </nav>
        </header>
    </>
  )
}