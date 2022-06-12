import { Controller } from "react-hook-form";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Grid } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { InputAdornment } from "@mui/material";
import { IconButton } from "@mui/material";


function StyledPassword({ show, control, name, description, type, md, xs, ...rest }) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    return (
        <>
            {show &&
                <Grid item md={md} xs={xs}>
                    <Controller
                        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                            <>
                                <TextField
                                fullWidth
                                {...rest}
                                    id="outlined-adornment-password"
                                    error={Boolean(error)}
                                    type={showPassword ? 'text' : 'password'}
                                    value={value? value : ""}
                                    helperText={error && error.message}
                                    onChange={onChange}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        
                                      }}
                                    label="Password"
                                />
                            </>}
                        name={name}
                        control={control}
                    />
                </Grid>
            }
        </>)
}

StyledPassword.defaultProps = {
    show: false
}
export default StyledPassword