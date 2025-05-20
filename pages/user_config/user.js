export function setUser(user) {
    sessionStorage.setItem("user", JSON.stringify(user));
} 

function getUser() {
    return JSON.parse(sessionStorage.getItem("user"));
}

export function getUserId() {
    return getUser()?.id;
}

export function getUserName() {
    return getUser()?.name;
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