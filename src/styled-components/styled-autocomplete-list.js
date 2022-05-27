import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete, Grid } from '@mui/material';

function StyledAutocompleteList({md,xs, control,name,description,errors,list,show,...props}) {
    /* useEffect(() => { }, [list]) */
    return (
        <>
            {
                show &&
                <Grid item md={md} xs={xs}>
                    <Controller
                        name={name}
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                            return (
                                <>
                                <Autocomplete
                                    defaultValue={value}
                                    disablePortal
                                    getOptionLabel={(list) => `${list}`}
                                    options={list}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    noOptionsText={"Sin opciones"}
                                    renderInput={(params) => <TextField {...params} label={description}
                                        error={Boolean(errors[name])}
                                        helperText={errors[name] && errors[name]?.message} />}
                                    value={value ? value : null}
                                    onChange={(event, item) => {
                                        onChange(item ? item : null)
                                    }}
                                    onBlur={onBlur}
                                    clearOnBlur={true}
                                />
                                </>
                            )
                        }}
                    />
                </Grid>}
        </>
    )
}
StyledAutocompleteList.defaultProps = {
    show: true
}

export default StyledAutocompleteList