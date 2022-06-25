import instance from "../config/axios"

//rutas Axios
//Get ALL
export function certificacionGetAll() {
    let token = localStorage.getItem("token")
    return instance.get(`certificacions/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}