import instance from "../config/axios"

//rutas Axios
export function parteGetAll() {
    let token = localStorage.getItem("token")
    return instance.get(`partes/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteGetRestricted() {
    let token = localStorage.getItem("token")
    return instance.get(`partes/restricted`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteGetUnrestricted() {
    let token = localStorage.getItem("token")
    return instance.get(`partes/unrestricted`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteCreate(parte) {
    let token = localStorage.getItem("token")
    return instance.post(`partes/create`, parte, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteEdit(parte,id) {
    let token = localStorage.getItem("token")
    return instance.put(`partes/edit/${id}`, parte, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteDelete(id) {
    let token = localStorage.getItem("token")
    return instance.delete(`partes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}