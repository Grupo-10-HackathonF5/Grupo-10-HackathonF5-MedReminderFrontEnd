import "./Card.css";

export default function Card({ title, children }) {
  return (
    <div className="card">
      <h3 className="card__title">{title}</h3>
      <div className="card__content">{children}</div>
    </div>
  );
}
