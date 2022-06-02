
import React, { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import { TextField, Autocomplete, Grid, Box } from '@mui/material';

function AutocompleteContracts({handleContractChange, control, name, description, errors, get, xs, md, ...props }) {
    const [contracts, setContracts] = useState([])
    const listOfContracts = contracts.map((contracts) => contracts.nombre)

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
    }, [])

    const findContract = (item) => {
        //setContract(contracts.filter((contracts) => contracts.nombre === item))
        handleContractChange(contracts.filter((contracts) => contracts.nombre === item))
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
                                getOptionLabel={(listOfContracts) => `${listOfContracts}`}
                                options={listOfContracts}
                                isOptionEqualToValue={(option, value) => option === value}
                                noOptionsText={"Sin opciones"}
                                renderInput={(params) =>
                                    <TextField {...params} label={description} error={Boolean(errors[name])} helperText={errors[name] && errors[name]?.message} />}

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