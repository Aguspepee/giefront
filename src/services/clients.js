import instance from "../config/axios"

//rutas Axios
//Get ALL
export function clientGetAll() {
    let token = localStorage.getItem("token")
    return instance.get(`clients/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

//Get Names
export function clientGetNames() {
    let token = localStorage.getItem("token")
    return instance.get(`clients/names`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

//Create Client
export function clientCreate(client) {
    let token = localStorage.getItem("token")
    return instance.post(`clients/`, client, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

