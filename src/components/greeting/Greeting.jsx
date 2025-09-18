import { useEffect, useState } from "react";
import "./Greeting.css";

export default function Greeting({ name = "MARIA" }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();
  let greetingText = "¡Hola";
  if (hours >= 6 && hours < 12) {
    greetingText = "¡Buenos días";
  } else if (hours >= 12 && hours < 18) {
    greetingText = "¡Buenas tardes";
  } else {
    greetingText = "¡Buenas noches";
  }

  const dateStr = now.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const timeStr = now.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <section className="greeting">
      <div className="greeting__inner">
        <h2 className="greeting__text">
          {greetingText}, {name.toUpperCase()}!
        </h2>
        <span className="greeting__date">
          {dateStr} — {timeStr}
        </span>
      </div>
    </section>
  );
}
