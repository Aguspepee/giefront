import instance from "../config/axios"

//rutas Axios
//Get ALL
export function clientGetAll() {
    let token = localStorage.getItem("token")
    return instance.get(`clients/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

//Search
export function clientSearch(nombre) {
    let token = localStorage.getItem("token")
    return instance.get(`clients/search?nombre=${nombre}`, {
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

export function clientOne(id) {
    let token = localStorage.getItem("token")
    return instance.get(`clients/one/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function clientEdit(client, id) {
    let token = localStorage.getItem("token")
    return instance.put(`clients/edit/${id}`, client, {
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

export function clientDelete(id) {
    let token = localStorage.getItem("token")
    return instance.delete(`clients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function clientImage(id, formData) {
    let token = localStorage.getItem("token")
    return instance.put(`clients/image/${id}-clients`, formData, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

