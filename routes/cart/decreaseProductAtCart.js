import { getUserId, getToken } from "../../pages/user_config/user.js";

export function decreseQuantity(indice) {
    return axios.delete("http://localhost:8080/api/cart/DECREASE/" + getUserId() + "/product/" + indice, {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    })
    .then(response => {
        return response.data; // retorna o novo carItem
    }) 
    .catch(error => {
        console.log("ERRO: ", error);
        throw error;
    })
    
}