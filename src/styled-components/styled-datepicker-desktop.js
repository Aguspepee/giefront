import React from "react";
import { Grid } from '@mui/material';
import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


function StyledDatepickerDesktop({ control, name, list, description, errors, md, xs, ...rest }) {


    return (
        <>
            <Grid item md={md} xs={xs}>
                <Controller

                    name={name}
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                        const handleDateChange = (newValue) => {
                            onChange(newValue);
                        };
                        return (
                            <DesktopDatePicker
                                label={description}
                                margin="normal"
                                inputFormat="dd/MM/yyyy"
                                value={value}
                                onChange={(value) => handleDateChange(value)}
                                onBlur={onBlur}
                                renderInput={(params) =>
                                    <TextField fullWidth {...params} error={Boolean(error)} helperText={errors[name] && errors[name].message} />}
                            />)
                    }}
                />
            </Grid>
        </>
    )
}

export default StyledDatepickerDesktop