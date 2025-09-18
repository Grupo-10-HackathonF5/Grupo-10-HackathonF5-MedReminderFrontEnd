import React from 'react';
import './Header.css';
import Navbar from '../navbar/Navbar';

export default function Header({ appName = "MedReminder" }) {
    
  return (

    
    <header className="header">
        <Navbar/>
      <div className="header__inner">
        <div className="header__brand">
          <img 
            src="src/assets/images/logo-sanitas.svg" 
            alt="Sanitas" 
            className="header__logo"
          />
        </div>
        
        <div className="header__app-name">
          {appName}
        </div>
      </div>
    </header>
  );
}