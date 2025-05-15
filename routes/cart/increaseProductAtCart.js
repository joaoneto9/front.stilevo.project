import { getUserId, getToken } from "../../pages/user_config/user.js";

export function increaseQuantity(indice) {
    return axios.put("http://localhost:8080/api/cart/INCREASE/" + getUserId() + "/product/" + indice, 
    {}, //body vazio
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