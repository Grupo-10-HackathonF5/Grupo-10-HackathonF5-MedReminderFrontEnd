import axios from "axios";

const URL_API= "http://localhost:8080/api/medications";
const userId = 1

//Metodo GET para el READ
//Para ver TODAS las Medicinas
export const getAllMedication = async() => {
    try {
        const res = await axios.get(URL_API);
        return res.data; 
    } 
    catch(error) {
        console.error(`getAllMedications:`, error.message);
        throw error;
    }
}

//Para ver de a UNA SOLA Medicina
export const getOnMedicine = async (id) => {
    try {
        const res = await axios.get(`${URL_API}/${id}`);
        return res.data;
    } 
    catch (error) {
        console.error(`getOneMedicine ID ${id} error:`, error.message);
        throw error; 
    }
};


export const getAllMedicineByUser = async() => {
    try {
        const res = await axios.get(`${URL_API}/users/${userId}`);
        return res.data; 
    } 
    catch(error) {
        console.error(`getAllMedicineByUser:`, error.message);
        throw error;
    }
}


//Metodo POST para el CREATE
export const createMedicine = async(newmedicine)=>{
    try {
        const res = await axios.post(URL_API, newmedicine);
        return res.data;
    }
    catch (error) {
        console.error(`createMedicine error:`, error.message);
        throw error;
    }
};

//Metodo PUT para ACTUALIZAR
export const updateMedicine = async (id, editedMedicine) => {
    try {
        const res = await axios.put(`${URL_API}/${id}`, editedMedicine);
        return res.data;
    }
    catch (error) {
        console.error(`updateMedicine ID ${id} error:`, error.message);
        throw error;
    }
}

//Metodo DELETE para ELIMINAR
export const deleteMedicine = async (id) => {
    try {
        const res = await axios.delete(`${URL_API}/${id}`);
        return res.data;
        }
        catch (error) {
            console.error(`deleteMedicine ID ${id} error:`, error.message);
            throw error;
        }
    }

