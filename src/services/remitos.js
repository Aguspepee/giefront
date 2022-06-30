import instance from "../config/axios"
import * as qs from 'qs'

//rutas Axios 
//Get ALL
export function remitoGetAll(page, rowsPerPage, order, orderBy, search) {
    let token = localStorage.getItem("token")
    return instance.get(`remitos/?page=${page + 1}&rowsPerPage=${rowsPerPage}&order=${order}&orderBy=${orderBy}&${qs.stringify(search)}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function remitoNumero() {
    let token = localStorage.getItem("token")
    return instance.get(`remitos/numero`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function remitoCreate(selected) {
    let token = localStorage.getItem("token")
    return instance.put(`remitos/${selected}`,{},
     { headers: { Authorization: `Bearer ${token}` } })
}