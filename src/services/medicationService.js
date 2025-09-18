const KEY = "medications:v1";

const read = () => JSON.parse(localStorage.getItem(KEY) || "[]");
const write = (arr) => localStorage.setItem(KEY, JSON.stringify(arr));

export const getMedications = async () => read();

export const createMedication = async (med) => {
  const items = read();
  const id = crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
  const newMed = { id, ...med };
  items.push(newMed);
  write(items);
  return newMed;
};

export const updateMedication = async (updated) => {
  const items = read();
  const idx = items.findIndex((m) => m.id === updated.id);
  if (idx === -1) throw new Error("Medication not found");
  items[idx] = { ...items[idx], ...updated };
  write(items);
  return items[idx];
};

export const deleteMedication = async (id) => {
  const items = read().filter((m) => m.id !== id);
  write(items);
  return true;
};
