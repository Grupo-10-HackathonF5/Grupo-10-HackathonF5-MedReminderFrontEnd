import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__inner">
      
        <NavLink to="/" className="logo-link">
          <img
            src="src/assets/images/logo-sanitas.svg"  
            alt="Sanitas logo"
            className="logo"
          />
        </NavLink>
  
        <button
          className="burger"
          aria-label="Toggle menu"
          aria-controls="main-menu"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen(v => !v)}
        >
          {open ? (
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          )}
        </button>

        {/* Menú */}
        <div
          id="main-menu"
          className={`menu ${open ? "menu--open" : ""}`}
          role="menu"
        >
          <NavItem to="/">Home</NavItem>
          <NavItem to="/create">Registrar Medicamentos</NavItem>
          <NavItem to="/calendar">Mí día</NavItem>
          <NavItem to="/list">Mis medicamentos</NavItem>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className="menu__link"
      children={({ isActive }) => (
        <span data-active={isActive ? "true" : "false"}>{children}</span>
      )}
    />
  );
}
