import { getToken } from "../../pages/user_config/user.js";

export function getProductVariation(id) {
    return axios.get("http://localhost:8080/api/products/variation/" + id, {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    })
    .then(response => {
        return response.data; // retorna o Objeto
    })
    .catch(error => {
        console.log("Erro", error);
        throw error;
    })
}