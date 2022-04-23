import instance from "../config/axios"

export function userGet(){
    return instance.get(`users/`)
}

export function userRegister(user){
    return instance.post(`users/`,user)
}

export function userLogin(user){
    return instance.post(`users/login`,user)
}