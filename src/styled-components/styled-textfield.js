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
                                //margin="normal"
                                onChange={onChange}
                                onBlur={onBlur}
                                //size="small"
                                type={type}
                            />}
                        name={name}
                        control={control}
                    />
                </Grid>
            }
        </>)
}

StyledTexfield.defaultProps = {
    show: true
}
export default StyledTexfield