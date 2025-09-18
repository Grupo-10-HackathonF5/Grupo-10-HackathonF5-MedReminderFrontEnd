import { render, screen } from "@testing-library/react";
import Form from "./Form";

// Primer test: verificar que el formulario se renderiza
test("el formulario se renderiza correctamente", () => {
  // Renderiza el componente
  render(<Form onSubmit={jest.fn()} onCancel={jest.fn()} />);

  // Verifica que un campo clave del formulario exista
  const nameInput = screen.getByLabelText(/Nombre/i);
  expect(nameInput).toBeInTheDocument();
});

