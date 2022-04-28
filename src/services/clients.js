import instance from "../config/axios"

//rutas Axios
export function clientGet() {
    return instance.get(`clients/`)
}

export function clientCreate(client) {
    console.log("fueeeee")
    let token = localStorage.getItem("token")
    return instance.post(`clients/`, client, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

