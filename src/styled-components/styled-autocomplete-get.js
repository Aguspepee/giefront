
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete, Grid } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { InputAdornment } from '@mui/material';

function StyledAutocompleteGet({ Icon, md, xs, control, name, description, errors, get, show, ...props }) {
    const [jsonResults, setJsonResults] = useState([])

    useEffect(() => {
        async function onSubmit() {
            try {
                const res = await get()
                setJsonResults(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        onSubmit()
    }, [])
    console.log(jsonResults)

    return (
        <Grid item md={md} xs={xs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                    return (
                        <Autocomplete
                            defaultValue={value}
                            disablePortal
                            getOptionLabel={(jsonResults) => `${jsonResults?.apellido?.toUpperCase()}, ${jsonResults.nombre}`}
                            options={jsonResults}
                            isOptionEqualToValue={(option, value) => {
                                return (option._id === value._id)
                            }}
                            noOptionsText={"Sin opciones"}
                            renderInput={(params) => <TextField
                                {...params}
                                label={description}
                                placeholder={description}
                                error={Boolean(errors[name])}
                                helperText={errors[name] && errors[name]?.message}
                                InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {/* <EngineeringIcon /> */}
                                             <Icon/>
                                        </InputAdornment>
                                    )
                                }} />}
                            value={value ? value : null}
                            onChange={(event, item) => {
                                onChange(item ? item : null)
                            }}
                            onBlur={onBlur}
                            clearOnBlur={true}

                        />

                    )
                }}
            />
        </Grid>
    )
}

export default StyledAutocompleteGet