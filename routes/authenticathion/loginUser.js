export function login(email, password) {
    return axios.post('http://localhost:8080/api/users/POST/login', {
        email,
        password
    })
    .then(response => {
        return response.data.token;
    })
    .catch(error => {
        console.error('error', error);
    });
}