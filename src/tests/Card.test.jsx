import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from '../components/card/Card'; // 

describe('Componente Card', () => {

  it('debería mostrar el mensaje de carga mientras se obtienen los datos', () => {
    
    render(<Card />);

    const loadingMessage = screen.getByText(/cargando/i);

    expect(loadingMessage).toBeInTheDocument();
  });

});