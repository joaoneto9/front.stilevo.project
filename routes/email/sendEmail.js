import {getToken, getUserEmail } from "../../pages/user_config/user.js";

export function sendEmail(title, content) {
    return axios.post("http://localhost:8080/api/email", 
    {
        userEmail: getUserEmail(),
        title,
        content
    }, {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    }).catch(error => {
        console.error('error', error);
        throw error;
    });
}