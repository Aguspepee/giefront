import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { Grid } from '@mui/material';

function StyledTexfield({ show, control, name, description, type, md, xs, ...rest }) {
    return (
        <>
            {show &&
                <Grid item md={md} xs={xs}>
                    <Controller
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                            <TextField
                                fullWidth
                                {...rest}
                                value={value ? value : ""}
                                error={Boolean(error)}
                                helperText={error && error.message}
                                label={description}
                                onChange={onChange}
                                onBlur={onBlur}
                                type={type}
                                step={0.01}
                            />}
                        name={name}
                        control={control}
                    />
                </Grid>
            }
        </>)
}

StyledTexfield.defaultProps = {
    show: false
}
export default StyledTexfield