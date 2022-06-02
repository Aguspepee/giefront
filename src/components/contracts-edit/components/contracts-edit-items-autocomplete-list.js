import React from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete } from '@mui/material';

function InputAutocompleteList({ control, name, description, errors, list, ...rest }) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                return (
                    <Autocomplete
                        defaultValue={value}
                        disablePortal
                        getOptionLabel={(list) => `${list}`}
                        options={list}
                        isOptionEqualToValue={(option, value) => option === value}
                        noOptionsText={"Sin opciones"}
                        renderInput={(params) => <TextField {...params} label={description}
                            error={Boolean(errors[name])}
                            helperText={errors[name] && errors[name]?.message} {...rest}/>}
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
    )
}

export default InputAutocompleteList