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
export const getOneMedication = async (id) => {
    try {
        const res = await axios.get(`${URL_API}/${id}`);
        return res.data;
    } 
    catch (error) {
        console.error(`getOneMedication ID ${id} error:`, error.message);
        throw error; 
    }
};


export const getAllMedicationByUser = async() => {
    try {
        const res = await axios.get(`${URL_API}/users/${userId}`);
        return res.data; 
    } 
    catch(error) {
        console.error(`getAllMedicationByUser:`, error.message);
        throw error;
    }
}


//Metodo POST para el CREATE
export const createMedication = async(newMedication)=>{
    try {
        const res = await axios.post(URL_API, newMedication);
        return res.data;
    }
    catch (error) {
        console.error(`createMedication error:`, error.message);
        throw error;
    }
};

//Metodo PUT para ACTUALIZAR
export const updateMedication = async (id, editedMedication) => {
    try {
        const res = await axios.put(`${URL_API}/${id}`, editedMedication);
        return res.data;
    }
    catch (error) {
        console.error(`updateMedication ID ${id} error:`, error.message);
        throw error;
    }
}

//Metodo DELETE para ELIMINAR
export const deleteMedication = async (id) => {
    try {
        const res = await axios.delete(`${URL_API}/${id}`);
        return res.data;
        }
        catch (error) {
            console.error(`deleteMedication ID ${id} error:`, error.message);
            throw error;
        }
    }

