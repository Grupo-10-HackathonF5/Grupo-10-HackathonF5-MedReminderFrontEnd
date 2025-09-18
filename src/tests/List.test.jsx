import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom'; // 
import axios from 'axios';
import List from '../pages/list/List';


vi.mock('axios');

describe('Componente List', () => {

  it('debería mostrar una lista de medicamentos después de obtener los datos', async () => {
    

    const mockMedications = [
      { id: 1, name: 'Aspirina', dosageQuantity: 1, dosageUnit: 'comprimido', notes: 'Con agua' },
      { id: 2, name: 'Loratadina', dosageQuantity: 10, dosageUnit: 'mg', notes: 'Por la mañana' },
    ];


    axios.get.mockResolvedValue({ data: mockMedications });

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );


    await waitFor(() => {
      expect(screen.getByText('Aspirina')).toBeInTheDocument();
      expect(screen.getByText('Loratadina')).toBeInTheDocument();
    });

    expect(screen.queryByText(/cargando/i)).toBeNull();
  });

  it('debería mostrar un mensaje de error si la llamada a la API falla', async () => {
    axios.get.mockRejectedValue(new Error('Error de red'));

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No se pudieron cargar los medicamentos.')).toBeInTheDocument();
    });
  });
});