import { useEffect, useMemo, useState } from "react";
import { getAllMedication } from "../../services/medication";
import "./Calendar.css";

export default function Calendar() {
  const [meds, setMeds] = useState([]);
  const [now, setNow] = useState(new Date());

  useEffect(() => { (async () => setMeds(await getAllMedication()))(); }, []);
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);

  const { past, upcoming } = useMemo(() => {
    const today = buildDayPlanFromTimes(meds, now);
    const past = today.filter(d => d.when <= now);
    const upcoming = today.filter(d => d.when > now);
    return {
      past: past.sort((a,b) => a.when - b.when),
      upcoming: upcoming.sort((a,b) => a.when - b.when),
    };
  }, [meds, now]);

  return (
    <div className="calendar">
      <h1 className="calendar__title">Tu Agenda Diaria</h1>

      <section className="calendar__section">
        <h2>Dosis Pasadas</h2>
        {past.length === 0 ? <p>No hay tomas pasadas.</p> : past.map(renderDose)}
      </section>

      <section className="calendar__section">
        <h2>Dosis Futuras</h2>
        {upcoming.length === 0 ? <p>No hay tomas futuras.</p> : upcoming.map(renderDose)}
      </section>
    </div>
  );
}

/* ------ Helpers usando times[] ------ */

function buildDayPlanFromTimes(meds, now) {
  const start = startOfDay(now);
  const end = endOfDay(now);
  const items = [];

  for (const m of meds) {
    const times = Array.isArray(m.times) && m.times.length
      ? m.times
      : fallbackTimes(m); // compat con modelo viejo

    for (const t of times) {
      const when = toTodayDate(t, start); // Date de hoy a HH:MM
      if (when >= start && when <= end) {
        items.push({
          id: `${m.id}-${t}`,
          when,
          name: m.name,
          strength: m.strength,
          dosage: m.dosage,
        });
      }
    }
  }
  return items;
}

function toTodayDate(hhmm, dayStart) {
  const [hh="08", mm="00"] = String(hhmm).split(":");
  const d = new Date(dayStart);
  d.setHours(parseInt(hh,10), parseInt(mm,10), 0, 0);
  return d;
}

/* ---- Fallback para items antiguos sin times[] ---- */
function fallbackTimes(med) {
  // 1) si hay time → úsalo
  if (med.time) return [med.time];

  // 2) si hay interval "8h" y time → genera varias
  const match = /^(\d+)\s*h$/.exec((med.interval || "").trim());
  if (match && med.time) {
    const step = Number(match[1]);
    const arr = [med.time];
    let [h, m] = med.time.split(":").map(Number);
    while (h + step < 24) {
      h += step;
      arr.push(`${String(h).padStart(2,"0")}:${String(m||0).padStart(2,"0")}`);
    }
    return arr;
  }

  // 3) si hay frequency numérica y time → repartimos aproximado
  const freq = Number((med.frequency || "").replace(/[^\d]/g, ""));
  if (freq && med.time) {
    const base = med.time;
    const arr = [base];
    const step = Math.floor(24 / freq);
    let [h, m] = base.split(":").map(Number);
    for (let i = 1; i < freq; i++) {
      const nh = (h + step * i) % 24;
      arr.push(`${String(nh).padStart(2,"0")}:${String(m||0).padStart(2,"0")}`);
    }
    arr.sort();
    return arr;
  }

  return ["08:00"];
}

/* ---- utilidades ---- */
function startOfDay(d) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function endOfDay(d)   { const x = new Date(d); x.setHours(23,59,59,999); return x; }

function renderDose(d) {
  const hh = d.when.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  return (
    <div key={d.id} className="dose">
      <div className="dose__time">{hh}</div>
      <div className="dose__info">
        <strong>{d.name}</strong> — {d.strength} — {d.dosage}
      </div>
    </div>
  );
}
