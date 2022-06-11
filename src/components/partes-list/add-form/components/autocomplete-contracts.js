
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete, Grid, Box } from '@mui/material';
import { InputAdornment } from '@mui/material';

function AutocompleteContracts({ Icon, contract, setContract, control, name, description, errors, get, xs, md, ...props }) {
    const [contracts, setContracts] = useState([])
    const listOfContracts = contracts.map((contracts) => { return ({ _id: contracts._id, nombre: contracts.nombre }) })

    useEffect(() => {
        async function onSubmit() {
            try {
                const res = await get()
                setContracts(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        onSubmit()
    }, [contract])

    const findContract = (item) => {
        setContract(contracts.filter((contracts) => contracts.nombre === item.nombre))
    }
    return (
        <>
            <Grid item xs={xs} md={md}>
                <Controller

                    name={name}
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref, ...field } }) => {
                        return (
                            <Autocomplete
                                defaultValue={value}
                                disablePortal
                                getOptionLabel={(listOfContracts) => `${listOfContracts.nombre}`}
                                options={listOfContracts}
                                //isOptionEqualToValue={(option, value) => option === value}
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
                                                <Icon />
                                            </InputAdornment>
                                        )
                                    }} />}
                                value={value ? value : null}
                                onChange={(event, item) => {
                                    findContract(item)
                                    onChange(item ? item : null)
                                }}
                                onBlur={onBlur}
                                clearOnBlur={true}

                            />
                        )
                    }}
                />
            </Grid>

        </>
    )
}

export default AutocompleteContracts