import React, { useState } from "react";
import {
    Grid, IconButton, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

function StyledAdicional({ control, name, list, description, items, index, errors, ...rest }) {
    const [unidad, setUnidad] = useState(null)
    let items_list = list?.filter((dato) => dato.clase === "Subítem").map((dato) => dato.descripcion_servicio)
    items_list = items_list ? items_list : []
    const handleUnit = (item) => {
        setUnidad(list?.filter((list) => list.descripcion_servicio === item)[0]?.unidad_medida)
    }

    return (
        <>

            <Grid item md={9} xs={12}>
                <Controller
                    name={`items.${index}.descripcion_servicio`}
                    control={control}
                    render={({ field: { onChange, onBlur, value, ref, ...field } }) =>
                        <Autocomplete
                            defaultValue={value}
                            disablePortal
                            getOptionLabel={(items_list) => `${items_list}`}
                            options={items_list}
                            isOptionEqualToValue={(option, value) => option === value}
                            noOptionsText={"Sin opciones"}
                            renderInput={(params) => <TextField {...params} label={"Descripción del Adicional"}
                                error={Boolean(errors?.items && errors?.items[index]?.descripcion_servicio)}
                                helperText={errors?.items && errors?.items[index]?.descripcion_servicio?.message} 
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
                            //disabled={unidad==="Porcentaje adicional"}
                            {...rest}
                            //value={value ? value : (unidad==="Porcentaje adicional"? 1 :"")}
                            value={value ? value : ""}
                            error={Boolean(error)}
                            helperText={error ? error.message : unidad}
                            label="Cantidad"
                            onChange={onChange}
                            onBlur={onBlur}
                            type="number"
                        />}
                    name={`items.${index}.cantidad`}
                    control={control}
                />
            </Grid>
            <Grid item md={1} xs={3}>
                <Tooltip title="Eliminar Adicional">
                    <IconButton color="primary" size="large" onClick={() => items.remove(index)}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Grid>
        </>
    )
}

export default StyledAdicional
