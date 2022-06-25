import instance from "../config/axios"

//rutas Axios
//Get ALL
export function settingGetAll() {
    let token = localStorage.getItem("token")
    return instance.get(`settings/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}