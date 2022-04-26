import instance from "../config/axios"

//rutas Axios
export function contractGet() {
    return instance.get(`contracts/`)
}

export function contractCreate(contract) {
    let token = localStorage.getItem("token")
    return instance.post(`contracts/`, contract, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

