import instance from "../config/axios"

//Get ALL
export function inicioIndicadoresAdministrador() {
    let token = localStorage.getItem("token")
    return instance.get(`inicio/administrador/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function inicioIndicadoresSupervisor() {
    let token = localStorage.getItem("token")
    return instance.get(`inicio/supervisor/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function inicioIndicadoresInspector(id) {
    let token = localStorage.getItem("token")
    return instance.get(`inicio/inspector/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function inicioIndicadoresAsistente() {
    let token = localStorage.getItem("token")
    return instance.get(`inicio/inspector/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}
