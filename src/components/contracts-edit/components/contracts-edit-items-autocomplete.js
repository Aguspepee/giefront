
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Stack, Autocomplete, Box, Typography } from '@mui/material';

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
    console.log(jsonResults)

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
            }}
        >
            <Controller
                name={name}
                control={control}
               // 
                render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                    console.log(value)
                    return(
                    <Autocomplete
                    defaultValue={{first_name: "MarShon",last_name:"Brooks"}}
                        disablePortal
                        getOptionLabel={(jsonResults) => `${jsonResults.first_name} ${jsonResults.last_name}`}
                        options={jsonResults}
                        isOptionEqualToValue={(option, value) => option?.first_name === value?.first_name}
                        noOptionsText={"Sin opciones"}
                        renderInput={(params) => <TextField {...params} label={description} value={value} error={Boolean(errors[name])} helperText={errors[name] && errors[name]?.message}/>}
                        size="small"
                        margin="none"
                        onChange={(event, item) => {
                            onChange(item?.first_name)
                        }}
                        onBlur={onBlur}
                        style={{ width: "100%" }}
                        
                        
                    />
                )}}
            />
        </Box>
    )
}

export default InputAutocomplete