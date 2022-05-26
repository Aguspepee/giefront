import React, { useEffect, useState } from "react";
import {
    Grid, IconButton, Tooltip, Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';

function StyledAdicional({ control, name, list, description, adicional, adicionales, index, errors, ...rest }) {
    const [unidad, setUnidad] = useState(null)
    let items = list?.filter((dato) => dato.clase === "Subítem").map((dato) => dato.descripcion_servicio)
    items = items ? items : []
    const handleUnit = (item) => {
        setUnidad(list?.filter((list) => list.descripcion_servicio === item)[0]?.unidad_medida)
    }

    return (
        <>

            <Grid item md={9} xs={12}>
                <Controller
                    name={`adicionales.${index}.descripcion_servicio`}
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref, ...field } }) =>
                        <Autocomplete
                            defaultValue={value}
                            disablePortal
                            getOptionLabel={(items) => `${items}`}
                            options={items}
                            isOptionEqualToValue={(option, value) => option === value}
                            noOptionsText={"Sin opciones"}
                            renderInput={(params) => <TextField {...params} label={"Descripción del Adicional"}
                                error={Boolean(errors?.adicionales && errors?.adicionales[index]?.descripcion_servicio)}
                                helperText={errors?.adicionales && errors?.adicionales[index]?.descripcion_servicio?.message} 
                                />}
                            value={value ? value : null}
                            onChange={(event, item) => {
                                handleUnit(item)
                                onChange(item ? item : null)
                            }}
                            onBlur={onBlur}
                            clearOnBlur={true}
                        />
                    }
                />
            </Grid>
            <Grid item md={2} xs={9}>
                <Controller
                    render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                        <TextField
                            fullWidth
                            {...rest}
                            value={value ? value : ""}
                            error={Boolean(error)}
                            helperText={error ? error.message : unidad}
                            label="Cantidad"
                            onChange={onChange}
                            onBlur={onBlur}
                            type="number"
                        />}
                    name={`adicionales.${index}.cantidad`}
                    control={control}
                />
            </Grid>
            <Grid item md={1} xs={3}>
                <Tooltip title="Eliminar Adicional">
                    <IconButton color="primary" size="large" onClick={() => adicionales.remove(index)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </>
    )
}

export default StyledAdicional
