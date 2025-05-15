import { getToken, getUserId } from "../../pages/user_config/user.js"

export function insertProductAtCart(productVariationId, size) {
    return axios.put("http://localhost:8080/api/cart/PUT/product", {
        clientId: getUserId(),
        productVariationId,
        size,
    }, {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    })
    .then(response => {
        return response.data;
    })
    .catch(error => {
        console.log("Erro: ", error);
        throw error;
    })

}