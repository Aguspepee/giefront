
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from '@mui/material';

function InputAutocomplete(props) {
    const control = props.control
    const name = props.name
    const description = props.description
    const errors = props.errors
    const [jsonResults, setJsonResults] = useState([])

    useEffect(() => {
        fetch("https://www.balldontlie.io/api/v1/players")
            .then((response) => response.json())
            .then((json) => setJsonResults(json.data))
    }, [])

    return (
        <Controller
            name={name}
            control={control}
            // 
            render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                console.log(value)
                return (
                    <Autocomplete
                        defaultValue={value}
                        disablePortal
                        getOptionLabel={(jsonResults) => `${jsonResults.first_name} ${jsonResults.last_name}`}
                        options={jsonResults}
                        isOptionEqualToValue={(option, value) => option?.first_name === value?.first_name}
                        noOptionsText={"Sin opciones"}
                        renderInput={(params) => <TextField {...params} label={description} error={Boolean(errors[name])} helperText={errors[name] && errors[name]?.message} />}
                        size="small"
                        margin="none"
                        value={value}
                        onChange={(event, item) => {
                            onChange({first_name: item.first_name ,last_name:item.last_name})
                        }}
                        onBlur={onBlur}
                        style={{ width: "10em" }}


                    />
                )
            }}
        />
    )
}

export default InputAutocomplete