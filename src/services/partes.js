import instance from "../config/axios"
import * as qs from 'qs'
import { qsobjects } from "../utils/qs-objets"
//import * as assert from 'assert'


//rutas Axios
export function parteGetAll() {
    let token = localStorage.getItem("token")
    return instance.get(`partes/`, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteGetRestricted(page, rowsPerPage, order, orderBy, search) {
    let token = localStorage.getItem("token")
    //return instance.get(`partes/restricted?page=${page + 1}&rowsPerPage=${rowsPerPage}&order=${order}&orderBy=${orderBy}${qsobjects(search)}`, {
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

export function parteCreate(parte) {
    let token = localStorage.getItem("token")
    return instance.post(`partes/create`, parte, {
        headers: { Authorization: `Bearer ${token}` }
    })
}

export function parteEdit(parte, id) {
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