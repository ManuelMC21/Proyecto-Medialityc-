import axios from 'axios';

export function register() {
    postData(apiUrl, datos);
}

function postData(url, data) {
    axios.post(url, data, {
        "Content-Type": "applicaton/json"
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });

}

export const datos = {
    "fullName": "Probando Front2",
    "email": "front2@gmail.com",
    "password": "psswFront@"
}

export const apiUrl = 'http://localhost:5009/api/register'

