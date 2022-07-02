import instance from "../config/axios"
import * as qs from 'qs'

//rutas Axios
//Get ALL
export function certificadoGetAll(page, rowsPerPage, order, orderBy, search) {
    let token = localStorage.getItem("token")
    return instance.get(`certificados/?page=${page + 1}&rowsPerPage=${rowsPerPage}&order=${order}&orderBy=${orderBy}&${qs.stringify(search)}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function certificadoNumero() {
    let token = localStorage.getItem("token")
    return instance.get(`certificados/numero`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function certificadoCreate(selected) {
    let token = localStorage.getItem("token")
    return instance.put(`certificados/${selected}`,{},
     { headers: { Authorization: `Bearer ${token}` } })
}

export function certificadoEstado({ data, id }) {
    let token = localStorage.getItem("token")
    return instance.put(`certificados/estado/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function certificadoDelete(selected) {
    let token = localStorage.getItem("token")
    return instance.delete(`certificados/${selected}`,
     { headers: { Authorization: `Bearer ${token}` } })
}