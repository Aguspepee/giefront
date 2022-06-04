import Chip from '@mui/material/Chip';
import { Tooltip } from '@mui/material';
import { useState } from 'react';

export default function StyledChipFilter({onChange}) {
    const [value, setValue] = useState ({value:null, color: undefined, label:"-", message:"Filtrar por SI"})
    let event=[]
    const handleClick = ()=>{
        if (value.value === null){
            setValue({value:true, color: "success", label:"SI", message:"Filtrar por NO"})
            event["target"] = {value: true}
            onChange(event)
        }else if(value.value === true){
            setValue({value:false, color: "error", label:"NO", message:"Eliminar filtro"})
            event["target"] = {value: false}
            onChange(event)
        }else{
            setValue({value:null, color: undefined, label:"-", message:"Filtrar por SI"})
            event["target"] = {value: null}
            onChange(event)
        }
    }


    return (
        <Tooltip title={value.message}>
            <Chip size="small" style={{ width: "60px" }} label={value.label } color={value.color} onClick={() => {handleClick() }} />
        </Tooltip>
    );
}