import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

export default function Form({ onSubmit, onCancel, initialData = {} }) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      dosage: "",
      strength: "",
      frequency: "",
      interval: "",
      time: "",
      ...initialData,
    },
  });

  useEffect(() => {
    Object.entries(initialData || {}).forEach(([k, v]) => setValue(k, v));
  }, [initialData, setValue]);

  const submitAll = (values) => onSubmit?.(values);

  return (
    <form className="med-form" onSubmit={handleSubmit(submitAll)} noValidate>
      {step === 1 && (
        <div className="form-step">
          <h2>Datos del medicamento</h2>

          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input id="name" placeholder="Aspirina"
              {...register("name", { required: "El nombre es obligatorio" })} />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="dosage">Posología / Dosis</label>
            <input id="dosage" placeholder="1 píldora al día"
              {...register("dosage", { required: "La dosis es obligatoria" })} />
            {errors.dosage && <p className="error">{errors.dosage.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="strength">Gramaje / concentración</label>
            <input id="strength" placeholder="500 mg"
              {...register("strength", { required: "El gramaje es obligatorio" })} />
            {errors.strength && <p className="error">{errors.strength.message}</p>}
          </div>

          <div className="actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>Cancelar</button>
            <button type="button" className="btn-primary" onClick={() => setStep(2)}>Siguiente</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Frecuencia y hora</h2>

          <div className="field">
            <label htmlFor="frequency">Frecuencia</label>
            <input id="frequency" placeholder="2 veces al día / c/8 horas"
              {...register("frequency", { required: "La frecuencia es obligatoria" })} />
            {errors.frequency && <p className="error">{errors.frequency.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="interval">Intervalo entre tomas</label>
            <input id="interval" placeholder="8h"
              {...register("interval", { required: "El intervalo es obligatorio" })} />
            {errors.interval && <p className="error">{errors.interval.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="time">Hora de la primera toma</label>
            <input id="time" type="time"
              {...register("time", { required: "La hora es obligatoria" })} />
            {errors.time && <p className="error">{errors.time.message}</p>}
          </div>

          <div className="actions">
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>Volver</button>
            <button type="submit" className="btn-primary">
              {initialData?.id ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
