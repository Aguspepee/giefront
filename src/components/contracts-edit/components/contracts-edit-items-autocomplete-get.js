
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from '@mui/material';

function InputAutocompleteGet({control,name,description,errors,get,...rest}) {
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
                        renderInput={(params) => <TextField {...params} label={description} error={Boolean(errors[name])} helperText={errors[name] && errors[name]?.message} {...rest}/>}
                        value={value? value : null}
                        onChange={(event, item) => {
                            onChange(item? item : null)
                        }}
                        onBlur={onBlur}
                        clearOnBlur = {true}

                    />
                )
            }}
        />
    )
}

export default InputAutocompleteGet