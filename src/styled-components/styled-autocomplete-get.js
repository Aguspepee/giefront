
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from '@mui/material';

function StyledAutocompleteGet(props) {
    const control = props.control
    const name = props.name
    const description = props.description
    const errors = props.errors
    const get = props.get
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

    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                return (
                    <Autocomplete
                        defaultValue={value }
                        disablePortal
                        getOptionLabel={(jsonResults) => `${jsonResults}`}
                        options={jsonResults}
                        isOptionEqualToValue={(option, value) => option === value}
                        noOptionsText={"Sin opciones"}
                        renderInput={(params) => <TextField {...params} label={description} error={Boolean(errors[name])} helperText={errors[name] && errors[name]?.message} />}
                        size="small"
                        margin="none"
                        value={value? value : null}
                        onChange={(event, item) => {
                            onChange(item? item : null)
                        }}
                        onBlur={onBlur}
                        style={{ width: "10em" }}
                        clearOnBlur = {true}

                    />
                )
            }}
        />
    )
}

export default StyledAutocompleteGet