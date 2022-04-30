
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from '@mui/material';

function InputAutocomplete(props) {
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
            // 
            render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                //console.log(value)
                return (
                    <Autocomplete
                        defaultValue={value }
                        disablePortal
                        getOptionLabel={(jsonResults) => `${jsonResults?.nombre}`}
                        options={jsonResults}
                        isOptionEqualToValue={(option, value) => option?.nombre === value?.nombre}
                        noOptionsText={"Sin opciones"}
                        renderInput={(params) => <TextField {...params} label={description} error={Boolean(errors[name])} helperText={errors[name] && errors[name]?.message} />}
                        size="small"
                        margin="none"
                        value={value? value : null}
                        onChange={(event, item) => {
                            onChange(item? { nombre: item?.nombre }: null)
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

export default InputAutocomplete