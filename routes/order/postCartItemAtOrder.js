import { getUserId } from "../../pages/user_config/user.js";
import { getToken } from "../../pages/user_config/user.js";

export function postCartItemToOrder(orderId, cartItemId) {
    return axios.post("http://localhost:8080/api/orders/" + orderId, 
        {
            userId: getUserId(),
            cartItemId,
        }, {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    })
    .then(response => {
        return response.data;
    }).catch(error => {
        console.log("ERROR: " + error);
        throw error;
    })
}