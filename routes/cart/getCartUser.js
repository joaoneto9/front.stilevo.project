import { getUserId } from "../../pages/user_config/user.js";
import { getToken } from "../../pages/user_config/user.js";

export function getCart() {
    return axios.get("http://localhost:8080/api/cart/GET/" + getUserId(), {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    })
    .then(response => {
        return response.data.cartItems; // retorna a lista de produtos do carrinho
    }) 
    .catch(error => {
        console.log("ERRO: ", error);
        throw error;
    })
}