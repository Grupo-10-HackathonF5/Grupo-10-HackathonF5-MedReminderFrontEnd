import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">

        <a href="/" className="footer__brand">
          <img
            src="src/assets/images/logo-sanitas.svg" 
            alt="Sanitas"
            className="footer__logo"
          />
        </a>

        <div className="footer__copy">
          <strong>© {new Date().getFullYear()} Hackathon F5 — Grupo 10 </strong>
        </div>
      </div>
    </footer>
  );
}
