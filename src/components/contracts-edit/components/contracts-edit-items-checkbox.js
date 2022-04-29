import { Controller } from "react-hook-form";
import { Checkbox, Box, Typography } from '@mui/material';

function InputCheckbox(props) {
    const control = props.control
    const name = props.name
    const defaultValue = props.defaultValue
    const description = props.description
    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
            }}
        >
            <Controller
                name={name}
                control={control}
                //defaultValue={defaultValue}
                render={({ field: { value, ref, onChange } }) => {
                    console.log(value)
                    return(
                    <Checkbox
                        inputRef={ref}
                        checked={!!value}
                        color="primary"
                        size={"medium"}
                        disableRipple
                        onChange={onChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                )}}
            />
            <Typography
                color="textSecondary"
                variant="body2"
            >
                {description}
            </Typography>
        </Box>
    )
}

export default InputCheckbox