import { getUserId, getToken } from "../../pages/user_config/user.js";

export function updateParcialDataUser(updateUser) {
    return axios.patch("http://localhost:8080/api/users/" + getUserId(), 
    {
        name: updateUser.name,
        password: updateUser.password,
        endereco: updateUser.endereco
    }, {
        headers: {
            Authorization: 'Bearer ' + getToken()
        }
    })
    .then(response => {
        return response.data;
        // retorna o user atualizado, dar um sessionStorage depois...
        // isso garante que o usuario foi atualizado no DB
    })
    .catch(error => {
        console.error('error', error);
        throw error;
    });
}