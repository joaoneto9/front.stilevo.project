import axios from 'axios';

export function registerUser(username, email, password, role) {
    axios.post('http://localhost:8080/api/users/POST/register', {
        username: username,
        email: email,
        password,
        role: role
    }) 
    .then(response => {
        return response.data; // retorna o usuario criado
    })
    .catch(error => {
        console.log('error', error); // da um console.log do erro
    })
}
