export function setUser(user) {
    updateUser(user);
} 

export function updateUser(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
}

function getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
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
    sessionStorage.setItem("token", token);
}

export function getToken() {
    return sessionStorage.getItem("token");
}