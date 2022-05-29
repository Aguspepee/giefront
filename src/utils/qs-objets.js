export function qsobjects (obj){
    //Módulo hecho por AES
    console.log("VAAAA",obj)
    let str = ""
obj.forEach(obj => {
    str = `${str}&${Object.keys(obj)[0].replace("[",".").replace("]","")}=${obj[Object.keys(obj)[0]]}`
});



    /* obj.map((obj)=>{
        str = `${str}&${Object.keys(obj)[0].replace("[",".").replace("]","")}=${obj[Object.keys(obj)[0]]}`
    }) */
    return (str)
    }