import { getUserId } from "../../pages/user_config/user";

export function updateDadosRequest(updateUser) {
    axios.put("http://localhost:8080/api/users/UPDATE" + getUserId(), 
    {
        name: updateUser.name,
        email: updateUser.email,
        password: updateUser.password,
        endereco: updateUser.endereco
    })
    .then(response => {
        return response.data 
        // retorna o user atualizado, dar um sessionStorage depois...
        // isso garante que o usuario foi atualizado no DB
    })
    .catch(error => {
        console.error('error', error);
        throw error;
    });
}