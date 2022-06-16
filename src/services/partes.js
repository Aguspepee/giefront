import instance from "../config/axios"
import * as qs from 'qs'
import { qsobjects } from "../utils/qs-objets"


//rutas Axios
export function parteGetAll() {
    let token = localStorage.getItem("token")
    return instance.get(`partes/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteGetRestricted(page, rowsPerPage, order, orderBy, search) {
    let token = localStorage.getItem("token")
    return instance.get(`partes/restricted?page=${page + 1}&rowsPerPage=${rowsPerPage}&order=${order}&orderBy=${orderBy}&${qs.stringify(search)}`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteGetUnrestricted() {
    let token = localStorage.getItem("token")
    return instance.get(`partes/unrestricted`, {
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

export function parteEdit({parte, id}) {
    console.log("id",id)
    console.log("parte",parte)
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

export function parteDeleteMany(selected) {
    let token = localStorage.getItem("token")
    return instance.delete(`partes/many/${selected}`,
     { headers: { Authorization: `Bearer ${token}` } })
}