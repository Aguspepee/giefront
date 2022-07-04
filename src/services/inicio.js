import instance from "../config/axios"

//Get ALL
export function inicioIndicadoresInspector(id) {
    let token = localStorage.getItem("token")
    return instance.get(`inicio/inspector/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
