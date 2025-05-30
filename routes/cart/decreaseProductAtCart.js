import { getUserId, getToken } from "../../pages/user_config/user.js";

export function decreseQuantity(indice) {
    return axios.patch("http://localhost:8080/api/carts/" + getUserId() + "/product/" + indice + "/decrease", 
    {},
    {
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