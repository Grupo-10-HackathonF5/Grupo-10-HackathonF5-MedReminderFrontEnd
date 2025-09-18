import axios from 'axios';

// La URL base de tu backend.
// Asegúrate de que el puerto (8080) sea el correcto.
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Función para obtener todos los medicamentos
export const getAllMedications = () => {
  return apiClient.get('/medications');
};

