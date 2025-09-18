// src/services/medicationService.js

let mockMedications = []; // Esto es temporal mientras no haya backend

export const getMedications = async () => {
  // Retorna los medicamentos actuales
  return mockMedications;
};

export const createMedication = async (medication) => {
  const newMed = { ...medication, id: Date.now() };
  mockMedications.push(newMed);
  return newMed;
};

export const updateMedication = async (updatedMed) => {
  mockMedications = mockMedications.map((med) =>
    med.id === updatedMed.id ? updatedMed : med
  );
  return updatedMed;
};

export const deleteMedication = async (id) => {
  mockMedications = mockMedications.filter((med) => med.id !== id);
};
