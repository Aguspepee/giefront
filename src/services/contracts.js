import instance from "../config/axios"

//rutas Axios
export function contractGetList() {
    let token = localStorage.getItem("token")
    return instance.get(`contracts/list`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function contractEmpty() {
    let token = localStorage.getItem("token")
    return instance.post(`contracts/empty`, [],{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function contractOne(id) {
    let token = localStorage.getItem("token")
    return instance.get(`contracts/one/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function contractCreate(contract) {
    let token = localStorage.getItem("token")
    return instance.post(`contracts/`, contract, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function contractEdit(contract,id) {
    let token = localStorage.getItem("token")
    return instance.put(`contracts/edit/${id}`, contract, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function contractDelete(id) {
    let token = localStorage.getItem("token")
    return instance.delete(`contracts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}