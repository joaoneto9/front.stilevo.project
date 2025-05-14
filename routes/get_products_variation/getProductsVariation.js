import { getToken } from "../../pages/user_config/user.js";

export function getProducts() {
    return axios.get("http://localhost:8080/api/products/variation/GET/all", {
        headers: {
            'Authorization': 'Bearer ' + getToken()
        }
    }).then(response => {
        return response.data; // retorna todos os produtos
    }).catch(error => {
        console.log("ERRO: ", error);
        throw error;
    }) 
} 