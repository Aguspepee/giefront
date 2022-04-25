import instance from "../config/axios"

//rutas Axios
export function userGet() {
    return instance.get(`users/`)
}

export function userRegister(user) {
    let token = localStorage.getItem("token")
    return instance.post(`users/register`, user, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function userLogin(user) {
    return instance.post(`users/login`, user)
}

export function userLogout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
}

export function userWhoami() {
    let token = localStorage.getItem("token")

    return instance.post(`users/whoami`, "hola", {
        headers: { Authorization: `Bearer ${token}` }
    })
}