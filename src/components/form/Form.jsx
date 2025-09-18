import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

export default function Form({ onSubmit, onCancel, initialData = {}, userId = 42 }) {
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      dosageQuantity: "",
      dosageUnit: "",
      frequency: "",
      interval: "",
      time: "",
      notes: "",
      ...initialData,
    },
  });

  useEffect(() => {
    Object.entries(initialData || {}).forEach(([k, v]) => setValue(k, v));
  }, [initialData, setValue]);

  const submitAll = (values) => {
    // Parsear cantidad de la unidad si el usuario escribió "1 píldora"
    const parsedQuantity = parseInt(values.dosageQuantity) || 1;
    const payload = {
      userId,
      name: values.name,
      dosageQuantity: parsedQuantity,
      dosageUnit: values.dosageUnit || "", 
      frequency: values.frequency || "",
      interval: values.interval || "",
      time: values.time || "",
      notes: values.notes || "",
      active: true,
    };

    onSubmit?.(payload);
  };

  return (
    <form className="med-form" onSubmit={handleSubmit(submitAll)} noValidate>
      {step === 1 && (
        <div className="form-step">
          <h2>Datos del medicamento</h2>

          <div className="field">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              placeholder="Aspirina"
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="dosageQuantity">Cantidad</label>
            <input
              id="dosageQuantity"
              placeholder="1"
              {...register("dosageQuantity", { required: "La cantidad es obligatoria" })}
            />
            {errors.dosageQuantity && <p className="error">{errors.dosageQuantity.message}</p>}
          </div>

          <div className="field">
            <label htmlFor="dosageUnit">Unidad / Gramaje</label>
            <input
              id="dosageUnit"
              placeholder="mg / píldora"
              {...register("dosageUnit", { required: "La unidad es obligatoria" })}
            />
            {errors.dosageUnit && <p className="error">{errors.dosageUnit.message}</p>}
          </div>

          <div className="actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="button" className="btn-primary" onClick={() => setStep(2)}>
              Siguiente
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Frecuencia y hora</h2>

          <div className="field">
            <label htmlFor="frequency">Frecuencia</label>
            <input
              id="frequency"
              placeholder="2 veces al día / c/8 horas"
              {...register("frequency")}
            />
          </div>

          <div className="field">
            <label htmlFor="interval">Intervalo entre tomas</label>
            <input id="interval" placeholder="8h" {...register("interval")} />
          </div>

          <div className="field">
            <label htmlFor="time">Hora de la primera toma</label>
            <input id="time" type="time" {...register("time")} />
          </div>

          <div className="field">
            <label htmlFor="notes">Notas adicionales</label>
            <input id="notes" placeholder="Tomar con comida" {...register("notes")} />
          </div>

          <div className="actions">
            <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
              Volver
            </button>
            <button type="submit" className="btn-primary">
              {initialData?.id ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

