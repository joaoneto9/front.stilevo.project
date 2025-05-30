import { getToken, getUserId } from "../../pages/user_config/user.js"

export function insertProductAtCart(productVariationId, size) {
    return axios.post("http://localhost:8080/api/carts/" + getUserId() + "/product", {
        productVariationId,
        size
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