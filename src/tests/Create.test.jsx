import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Create from '../pages/create/Create';


vi.mock('axios');

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('Componente Create', () => {

  it('debería enviar los datos correctos a la API al guardar el formulario', async () => {
    
    axios.post.mockImplementation((url) => {
      if (url.includes('/api/medications')) {
        return Promise.resolve({ data: { id: 123, name: 'Ibuprofeno' } });
      }
      if (url.includes('/api/posologies')) {
        return Promise.resolve({ data: {} });
      }
      return Promise.reject(new Error('URL no mockeada'));
    });

    render(
      <MemoryRouter>
        <Create />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Ibuprofeno' } });
    fireEvent.change(screen.getByLabelText(/dosis/i), { target: { value: '200' } });
    fireEvent.change(screen.getByLabelText(/unidad/i), { target: { value: 'mg' } });
    fireEvent.change(screen.getByLabelText(/fecha de inicio/i), { target: { value: '2025-10-01' } });
    fireEvent.change(screen.getByLabelText(/hora de la primera toma/i), { target: { value: '09:00' } });
    fireEvent.change(screen.getByLabelText(/notas/i), { target: { value: 'Tomar con comida' } });

    fireEvent.click(screen.getByText(/guardar todo/i));


    await waitFor(() => {
  
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/medications',
        expect.objectContaining({
          name: 'Ibuprofeno',
          dosageQuantity: 200,
          notes: 'Tomar con comida'
        })
      );
    });
    
    await waitFor(() => {

      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8080/api/posologies',
        expect.objectContaining({
          medicationId: 123, 
          dayTime: '2025-10-01T09:00'
        })
      );
    });

 
    expect(mockedNavigate).toHaveBeenCalledWith('/medicamentos');
  });
});