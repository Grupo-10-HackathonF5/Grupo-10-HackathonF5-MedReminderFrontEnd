import axios from "axios";

const URL_API= "http://localhost:8080/api/posologies";
const userId = 1

//Metodo GET para el READ
//Para ver TODAS las posologías
export const getAllPosologies = async() => {
    try {
        const res = await axios.get(URL_API);
        return res.data; 
    } 
    catch(error) {
        console.error(`getAllPosologies:`, error.message);
        throw error;
    }
}

//Para ver de a UNA SOLA posología
export const getOnePosology = async (id) => {
    try {
        const res = await axios.get(`${URL_API}/${id}`);
        return res.data;
    } 
    catch (error) {
        console.error(`getOnePosology ID ${id} error:`, error.message);
        throw error; 
    }
};

export const getActivePosologies = async() => {
    try {
        const res = await axios.get(URL_API/active);
        return res.data; 
    } 
    catch(error) {
        console.error(`getActivePosologies:`, error.message);
        throw error;
    }
}


export const getAllPosologyByUser = async() => {
    try {
        const res = await axios.get(`${URL_API}/users/${userId}`);
        return res.data; 
    } 
    catch(error) {
        console.error(`getAllPosologyByUser:`, error.message);
        throw error;
    }
}


//Metodo POST para el CREATE
export const createPosology = async(newPosology)=>{
    try {
        const res = await axios.post(URL_API, newPosology);
        return res.data;
    }
    catch (error) {
        console.error(`createPosology error:`, error.message);
        throw error;
    }
};

//Metodo PUT para ACTUALIZAR
export const updatePosology = async (id, editedPosology) => {
    try {
        const res = await axios.put(`${URL_API}/${id}`, editedPosology);
        return res.data;
    }
    catch (error) {
        console.error(`updatePosology ID ${id} error:`, error.message);
        throw error;
    }
}

//Metodo DELETE para ELIMINAR
export const deletePosology = async (id) => {
    try {
        const res = await axios.delete(`${URL_API}/${id}`);
        return res.data;
        }
        catch (error) {
            console.error(`deletePosology ID ${id} error:`, error.message);
            throw error;
        }
    }

