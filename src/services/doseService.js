import axios from "axios";

const URL_API= "http://localhost:8080/api/doses";
const userId = 1



export const getAllDoseByUser = async() => {
// Enviar fecha de inicio y fecha de final en caso de que se implemente
    try {
        const res = await axios.get(`${URL_API}/users/${userId}`);
        return res.data; 
    } 
    catch(error) {
        console.error(`getAllDoseByUser:`, error.message);
        throw error;
    }
}

//Metodo PUT para cambiar entre tomada y no tomada
export const updateDose = async (id, editedDose) => {
    try {
        const res = await axios.put(`${URL_API}/${id}`);
        return res.data;
    }
    catch (error) {
        console.error(`updateDose ID ${id} error:`, error.message);
        throw error;
    }
}

export const getTodayDoses = async() => {
    try {
        const res = await axios.get(`${URL_API}/users/${userId}/today`);
        return res.data; 
    } 
    catch(error) {
        console.error(`getTodayDoses:`, error.message);
        throw error;
    }
}

