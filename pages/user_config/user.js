export function setUser(user) {
    updateUser(user);
} 

export function updateUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
    return JSON.parse(localStorage.getItem("user"));
}

export function getUserId() {
    return getUser()?.id;
}

export function getUserUsername() {
    return getUser()?.username;
}

export function getUserEmail() {
    return getUser()?.email;
}

export function getUserEndereco() {
    return getUser()?.endereco; //Object
}

export function setToken(token) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem("token");
}