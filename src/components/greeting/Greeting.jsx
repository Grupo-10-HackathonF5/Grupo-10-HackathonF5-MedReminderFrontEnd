import "./Greeting.css";

export default function Greeting({ name = "Usuario" }) {
  // Fecha actual formateada en español
  const today = new Date().toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="greeting">
      <div className="greeting__inner">
        <h2 className="greeting__text">¡HOLA, {name.toUpperCase()}!</h2>
        <span className="greeting__date">{today}</span>
      </div>
    </section>
  );
}
