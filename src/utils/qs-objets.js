export function qsobjects (obj){
    //Módulo hecho por AES
    let str = ""
    obj.map((obj)=>{
        str = `${str}&${Object.keys(obj)[0].replace("[",".").replace("]","")}=${obj[Object.keys(obj)[0]]}`
    })
    return (str)
    }