import { useState } from 'react';
import { Checkbox, Box } from '@mui/material';


function StyledCheckboxActive(props) {
    const edit = props.edit
    const id = props.id
    const name = props.name
    const [value, setValue] = useState(props.value)
    const description = props.description

    async function onChange(value) {
        setValue(value)
        try {
            const res = await edit({ active: value }, id)
            console.log("Se modificó el usuario", res.data)
            //setSuccess(true)
            //setError(false)
        } catch (e) {
            console.log(e)
            //setError(true)
            //setSuccess(false)
        }
    }

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
            }}
        >
            <Checkbox
                value={value}
                checked={!!value}
                color="primary"
                size={"medium"}
                onChange={e => onChange(e.target.checked)}
            />
        </Box>
    )
}

export default StyledCheckboxActive