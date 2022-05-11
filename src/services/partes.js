import instance from "../config/axios"

//rutas Axios
export function parteGetList() {
    let token = localStorage.getItem("token")
    return instance.get(`partes/list`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteEmpty() {
    let token = localStorage.getItem("token")
    return instance.post(`partes/empty`, [],{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteOne(id) {
    let token = localStorage.getItem("token")
    return instance.get(`partes/one/${id}`,{
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