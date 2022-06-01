import { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';


export default function StyledChipUpdate({value, field, id, onChangeFunction,...props}) {
    const [estado, setEstado] = useState(value||false)
    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    return (
            <Chip size="small" style={{width:"60px"}} label={value? "SI":"NO"} color={value? "success":"error"} onClick={handleClick}/>
    );
}