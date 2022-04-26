import { React, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Divider,
  TextField,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { contractCreate } from "../../services/contracts";

//Icons
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';

const schema = yup.object().shape({
  nombre: yup.string().required("First Name is required"),
  descripcion: yup.string().required("First Name is required"),
  tipo: yup.string(),
  cliente: yup.string().required("First Name is required"),
  fecha_inicio: yup.date(),
  fecha_fin: yup.date(),
  items: yup.array().of(
    yup.object().shape({
      descripcion: yup.string().required("First Name is required"),
      //lastName: yup.string().required("Last Name is required")
    })
  ),
  unidades: yup.array().of(
    yup.object().shape({
      nombre: yup.string().required("First Name is required"),
      //lastName: yup.string().required("Last Name is required")
    })
  )
})

function ContractsEditItems() {
  const { register, control, handleSubmit, reset, trigger, setError } = useForm({
    resolver: yupResolver(schema)
  });
  //const { fields, append, remove, move } = useFieldArray({
  const items = useFieldArray({
    control,
    name: "items"
  });
  const unidades = useFieldArray({
    control,
    name: "unidades"
  });

  async function onSubmit (contract) {
    console.log("contrato",contract)
    try {
      const res = await contractCreate(contract)
      //localStorage.setItem("token", res.data.token)
      console.log("Se creó el contrato", res.data)
      //console.log(res.data.user)
      //setUser(res.data.user)
      //res.data.token ? navigate("/") :
        // console.log(res.data.message)
      //setError(res.data.message)
      //setSuccess(true) 
    } catch (e) {
      console.log(e)
    }
  }


  //Estados de las fechas de inicio y fin
  const [fechaInicio, setFechaInicio] = useState(new Date());
  const [fechaFin, setFechaFin] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card >
        <CardContent>
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <Typography variant="h6" gutterBottom component="div">
              Datos generales
            </Typography>
            <Controller
              render={({ field: { onChange, onBlur, ref } }) =>
                <TextField
                  label="Nombre del Contrato"
                  margin="normal"
                  onChange={onChange}
                  onBlur={onBlur}
                  size="small"
                />}
              name={`nombre`}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, ref } }) =>
                <TextField
                  label="Descripción del Contrato"
                  margin="normal"
                  onChange={onChange}
                  onBlur={onBlur}
                  size="small"
                />}
              name={`descripcion`}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, ref } }) =>
                <TextField
                  label="Tipo del Contrato"
                  margin="normal"
                  onChange={onChange}
                  onBlur={onBlur}
                  size="small"
                />}
              name={`tipo`}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, ref } }) =>
                <TextField
                  label="Cliente"
                  margin="normal"
                  onChange={onChange}
                  onBlur={onBlur}
                  size="small"
                />}
              name={`cliente`}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, ref } }) => {
                const handleDateChange = (newValue) => {
                  onChange(newValue);
                  setFechaInicio(newValue);
                };
                return (<DesktopDatePicker
                  label="Fecha de Inicio"
                  margin="normal"
                  inputFormat="dd/MM/yyyy"
                  value={fechaInicio}
                  onChange={(value) => handleDateChange(value)}
                  onBlur={onBlur}
                  renderInput={(params) =>
                    <TextField size="small" {...params} />}
                />)
              }}
              name={`fecha_inicio`}
              control={control}
            />
            <Controller
              render={({ field: { onChange, onBlur, ref } }) => {
                const handleDateChange = (newValue) => {
                  onChange(newValue);
                  setFechaFin(newValue);
                };
                return (<DesktopDatePicker
                  label="Fecha de Fin"
                  margin="normal"
                  inputFormat="dd/MM/yyyy"
                  value={fechaFin}
                  onChange={(value) => handleDateChange(value)}
                  onBlur={onBlur}
                  renderInput={(params) =>
                    <TextField size="small" {...params} />}
                />)
              }}
              name={`fecha_fin`}
              control={control}
            />

            <Divider style={{ paddingTop: "1.5em" }} />
            <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
              Ítems del contrato
            </Typography>
            {items.fields.map((item, index) => (
              <Box key={item.id} style={{ padding: "18px 0px 15px 0px" }}>
                {index+1}-
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Descripción"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.descripcion`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Unidad"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.unidad`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Código de Servicio"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.codigo`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Tipo de Actividad"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.tipo`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="SubTipo de Actividad"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.subtipo`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Precio"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.precio`}
                  control={control}
                />
                <Tooltip title="Subir un nivel">
                  <IconButton sx={{ ml: 1 }} onClick={() => items.move(index, index !== 0 ? index - 1 : index)}>
                    <ArrowUpwardIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Bajar un nivel">
                  <IconButton sx={{ ml: 1 }} onClick={() => items.move(index, index + 1)}>
                    <ArrowDownwardIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Eliminar Item">
                  <IconButton sx={{ ml: 1 }} onClick={() => items.remove(index)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            ))}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => items.append({})}
            >
              Agregar Ítems
            </Button>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => { for (let i = 1; i < 10; i++) { items.append({}) } }}
            >
              Agregar Ítem x10
            </Button>
            <Divider style={{ paddingTop: "1.5em" }} />
            <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
              Unidades
            </Typography>
            {unidades.fields.map((unidad, index) => (
              <Box key={unidad.id} style={{ padding: "18px 0px 15px 0px" }}>
                {index+1}-
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Nombre"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`unidades.${index}.nombre`}
                  control={control}
                />
                </Box>))}
                <Button
              color="primary"
              variant="contained"
              onClick={() => unidades.append({})}
            >
              Agregar Unidades
            </Button>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Guardar Cambios
            </Button>
          </form>
        </CardContent>
      </Card>
    </LocalizationProvider>
  );
}

export default ContractsEditItems