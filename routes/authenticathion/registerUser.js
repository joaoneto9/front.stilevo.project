export function registerUser(name, email, password, role) {
    return axios.post('http://localhost:8080/api/users/', {
        name: name,
        email: email,
        password: password,
        role: role
    }) 
    .then(response => {
        return response.data; // retorna o usuario criado
    })
    .catch(error => {
        console.log('error', error); // da um console.log do erro
        throw error;
    })
}
