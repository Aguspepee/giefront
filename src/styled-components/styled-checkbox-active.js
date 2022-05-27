import { useState } from 'react';
import { Checkbox, Box } from '@mui/material';


function StyledCheckboxActive(props) {
    const edit = props.edit
    const id = props.id
    const fieldFey = props.fieldFey
    const [value, setValue] = useState(props.value)

    async function onChange(value) {
        setValue(value)
        try {
            const res = await edit({ [fieldFey]: value }, id)
            console.log("Se modificó el usuario", res.data)
        } catch (e) {
            console.log(e)
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