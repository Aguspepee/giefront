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
  nombre: yup.string().required("El nombre del cliente es requerido"),
  descripcion: yup.string().required("La descripción del contrato es requerida"),
  tipo: yup.string().required("La descripción del contrato es requerida"),
  cliente: yup.string().required("El cliente es requerido"),
  fecha_inicio: yup.date().required("La fecha de inicio del proyecto es requerida"),
  fecha_fin: yup.date().required("La fecha de inicio del proyecto es requerida"),
  items: yup.array().of(
    yup.object().shape({
      descripcion: yup.string().required("First Name is required"),
      codigo_servicio: yup.string().required("First Name is required"),
      unidad_medida: yup.string().required("First Name is required"),
      tipo_actividad: yup.string().required("First Name is required"),
      subtipo_actividad: yup.string().required("First Name is required"),
      valor: yup.number().required("First Name is required"),
    })
  ),
  unidades: yup.array().of(
    yup.object().shape({
      nombre: yup.string().required("El nombre de la unidad es requerido"),
      abreviatura: yup.string().length(3, "Debe tener 3 caracteres").required("Se debe colocar una abreviatura")
    })
  ),
  certificantes: yup.array().of(
    yup.object().shape({
      nombre: yup.string().required("El nombre de la unidad es requerido"),
      apellido: yup.string().required("El nombre de la unidad es requerido"),
    })
  )
})

function ContractsEditItems() {
  const { register, control, handleSubmit, reset, trigger, setError, formState: { errors } } = useForm({
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
  const certificantes = useFieldArray({
    control,
    name: "certificantes"
  });

  async function onSubmit(contract) {
    console.log("contrato", contract)
    try {
      const res = await contractCreate(contract)
      console.log("Se creó el contrato", res.data)
    } catch (e) {
      console.log(e)
    }
  }


  //Estados de las fechas de inicio y fin
  const [fechaInicio, setFechaInicio] = useState();
  const [fechaFin, setFechaFin] = useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card >
        <CardContent>
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <Typography variant="h6" gutterBottom component="div">
              Datos generales
            </Typography>
            <Controller
              render={({ field: { onChange, onBlur, ref, formState } }) =>
                <TextField
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre && errors.nombre.message}
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
                  error={Boolean(errors.descripcion)}
                  helperText={errors.descripcion && errors.descripcion.message}
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
                  error={Boolean(errors.tipo)}
                  helperText={errors.tipo && errors.tipo.message}
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
                  error={Boolean(errors.cliente)}
                  helperText={errors.cliente && errors.cliente.message}
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
              name={`fecha_inicio`}
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value, onBlur } }) => {
                const handleDateChange = (newValue) => {
                  onChange(newValue);
                  setFechaInicio(newValue);
                };
                return (
                  <DesktopDatePicker
                    error={Boolean(errors.fecha_inicio)}
                    helperText={errors.fecha_inicio && errors.fecha_inicio.message}
                    label="Fecha de Inicio"
                    margin="normal"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={(value) => handleDateChange(value)}
                    onBlur={onBlur}
                    renderInput={(params) =>
                      <TextField size="small" {...params} />}
                  />)
              }}

            />
            <Controller
              name={`fecha_fin`}
              control={control}
              defaultValue={null}
              render={({ field: { onChange, value, onBlur } }) => {
                const handleDateChange = (newValue) => {
                  onChange(newValue);
                  setFechaFin(newValue);
                };
                return (
                  <DesktopDatePicker
                    error={Boolean(errors.fecha_fin)}
                    helperText={errors.fecha_fin && errors.fecha_fin.message}
                    label="Fecha de Fin"
                    margin="normal"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={(value) => handleDateChange(value)}
                    onBlur={true}
                    renderInput={(params) =>
                      <TextField size="small" {...params} />}
                  />)
              }}
            />

            <Divider style={{ paddingTop: "1.5em" }} />
            <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
              Ítems del contrato
            </Typography>
            {items.fields.map((item, index) => (
              <Box key={item.id} style={{ padding: "18px 0px 15px 0px" }}>
                {index + 1}-
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
                      label="Código de Servicio"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.codigo_servicio`}
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
                  name={`items.${index}.tipo_actividad`}
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
                  name={`items.${index}.subtipo_actividad`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Valor"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.valor`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      label="Unidad de Medida"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`items.${index}.unidad_medida`}
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
                {index + 1}-
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      error={Boolean(errors.unidades?.[index]?.nombre)}
                      helperText={errors.unidades?.[index]?.nombre && errors.unidades?.[index]?.nombre?.message}
                      label="Nombre"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`unidades.${index}.nombre`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      error={Boolean(errors.unidades?.[index]?.abreviatura)}
                      helperText={errors.unidades?.[index]?.abreviatura && errors.unidades?.[index]?.abreviatura?.message}
                      label="Abreviatura"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`unidades.${index}.abreviatura`}
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
            <Divider style={{ paddingTop: "1.5em" }} />
            <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
              Certificantes
            </Typography>
            {certificantes.fields.map((certificante, index) => (
              <Box key={certificante.id} style={{ padding: "18px 0px 15px 0px" }}>
                {index + 1}-
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      error={Boolean(errors.certificantes?.[index]?.nombre)}
                      helperText={errors.certificantes?.[index]?.nombre && errors.certificantes?.[index]?.nombre?.message}
                      label="Nombre"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`certificantes.${index}.nombre`}
                  control={control}
                />
                <Controller
                  render={({ field: { onChange, onBlur, ref } }) =>
                    <TextField
                      error={Boolean(errors.certificantes?.[index]?.apellido)}
                      helperText={errors.certificantes?.[index]?.apellido && errors.certificantes?.[index]?.apellido?.message}
                      label="Apellido"
                      margin="none"
                      onChange={onChange}
                      onBlur={onBlur}
                      size="small"
                    />}
                  name={`certificantes.${index}.apellido`}
                  control={control}
                />
              </Box>))}
            <Button
              color="primary"
              variant="contained"
              onClick={() => certificantes.append({})}
            >
              Agregar Certificantes
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