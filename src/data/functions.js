import axios from 'axios';

export async function register(datos, navigate) {
    await postDataRegister(apiUrlRegister, datos, navigate);
}

export async function login(datos, navigate) {
    await postDataLogin(apiUrlLogin, datos, navigate);
}

export async function createRestaurant(datos) {
    await postDataCreateR(apiUrlFormulary, datos);
}

export async function createEntity(datos) {
    return await postDataCreateR('http://localhost:5009/api/entities', datos);
}


export async function createImage(datos) {
    try {
        const blob = base64ToBlob(datos.image);  

        const formData = new FormData();
        formData.append('file', blob, 'image.jpg'); 

        const url = `http://localhost:5009/entity/${datos.id}/upload`;

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        console.log("Se envió la foto correctamente");
    } catch (error) {
        console.error('Error al subir la imagen:', error);
    }
}

const base64ToBlob = (base64, type = 'image/jpeg') => {
    const byteCharacters = atob(base64.split(',')[1]); // Decodificar base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type });
};

export async function getEntity(id) {
    try {
        const blob = base64ToBlob(datos.image);  

        const formData = new FormData();
        formData.append('file', blob, 'image.jpg'); 

        const url = `http://localhost:5009/entity/${id}`;

        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
        
    } catch (error) {
        console.error('Error al subir la imagen:', error);
    }
}
    

async function postDataRegister(url, data, navigate) {
    try {
        const response = await axios.post(url, data, {
            "Content-Type": "application/json"
        });
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/');
    } catch (error) {
        console.error(error);
    }
}

async function postDataCreateR(url, data) {
    const token = localStorage.getItem('token');
    try {
        const response = await axios.post(url, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        return false;
    }
}


async function postDataLogin(url, data, navigate) {
    try {
        const response = await axios.post(url, data, {
            "Content-Type": "application/json" // Corrección del typo "applicaton/json"
        });
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/');
    } catch (error) {
        console.error(error);
    }
}

export const fetchEntities = async () => {
    try {
        const response = await axios.get(apiUrlEntitys);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error('Error fetching entities:', error);
    }
};

const apiUrlRegister = 'http://localhost:5009/api/register';
const apiUrlLogin = 'http://localhost:5009/api/login';
const apiUrlFormulary = 'http://localhost:5009/api/create-restaurant';
const apiUrlEntitys = 'http://localhost:5009/api/entity-types';

