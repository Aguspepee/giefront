import { React, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Box, Card, CardContent, Button, Divider, TextField, IconButton, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { contractEdit } from "../../services/contracts";
import InputCheckbox from "./components/contracts-edit-items-checkbox"
import InputAutocomplete from "./components/contracts-edit-items-autocomplete";
import { useParams } from "react-router-dom";

//Icons
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';

//GET listas
import { clientGetNames } from '../../services/clients'

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre del cliente es requerido"),
  descripcion: yup.string().required("La descripción del contrato es requerida"),
  tipo: yup.string().required("La descripción del contrato es requerida"),
  cliente: yup.string().required("El cliente es requerido"),
  fecha_inicio: yup.date(),
  fecha_fin: yup.date(),
  numero_reporte: yup.boolean(),
  activo: yup.boolean(),

  campos: yup.object().shape({
    numero_reporte: yup.boolean().nullable(),
    numero_orden: yup.boolean().nullable(),
    adicionales: yup.boolean().nullable(),
    equipo_completo: yup.boolean().nullable(),
    diametro: yup.boolean().nullable(),
    espesor: yup.boolean().nullable(),
    numero_costuras: yup.boolean().nullable(),
    cantidad_placas: yup.boolean().nullable(),
    tipo_ensayo: yup.boolean().nullable(),
  }),

  items: yup.array().of(
    yup.object().shape({
      descripcion: yup.string().required("First Name is required"),
      codigo_servicio: yup.string().required("First Name is required"),
      unidad_medida: yup.string().required("First Name is required"),
      tipo_actividad: yup.string().required("First Name is required"),
      subtipo_actividad: yup.string().required("First Name is required"),
      valor: yup.number()
        .typeError('age must be a number')
        .positive('age must be greater than zero')
        .required('age is required')
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
  ),
})

function ContractsEditItems() {
  let { id } = useParams();
  console.log(id)
  const { control, handleSubmit, formState: { errors, value } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "Agustín",
      prueba: "Hola",
      //cliente: { nombre: "asdasd" },
      cliente: null,
      activo: true,
      unidades: [
        { nombre: "ricardo", abreviatura: "rod" },
        { nombre: "agustín", abreviatura: "san" }
      ],
      campos: {
        numero_reporte: true,
        numero_orden: true,
        adicionales: true,
        equipo_completo: true,
        diametro: false,
        espesor: false,
        numero_costuras: false,
        cantidad_placas: false,
        tipo_ensayo: false,
      }
    }
  });
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
      const res = await contractEdit(contract,id)
      console.log("Se modificó el contrato", res.data)
    } catch (e) {
      console.log(e)
    }
  }

  //Estados de las fechas de inicio y fin
 // const [fechaInicio, setFechaInicio] = useState();
  //const [fechaFin, setFechaFin] = useState();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Card >
        <CardContent>
          <form onSubmit={handleSubmit(data => onSubmit(data))}>
            <Typography variant="h6" gutterBottom component="div">
              Datos generales
            </Typography>
            <Controller

              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                <TextField
                  defaultValue={value}
                  error={Boolean(error)}
                  helperText={error && error.message}
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
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                <TextField
                  defaultValue={value}
                  error={Boolean(error)}
                  helperText={error && error.message}
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
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                <TextField
                  defaultValue={value}
                  error={Boolean(error)}
                  helperText={error && error.message}
                  label="Tipo del Contrato"
                  margin="normal"
                  onChange={onChange}
                  onBlur={onBlur}
                  size="small"
                />}
              name={`tipo`}
              control={control}
            />
            <InputAutocomplete control={control} name="cliente" get={clientGetNames} description="Cliente" errors={errors} />
            <Controller
              name={`fecha_inicio`}
              control={control}
              defaultValue={null}
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                const handleDateChange = (newValue) => {
                  onChange(newValue);
                 // setFechaInicio(newValue);
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
              render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => {
                const handleDateChange = (newValue) => {
                  onChange(newValue);
                 // setFechaFin(newValue);
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
            <InputCheckbox control={control} name="activo" defaultValue={false} description="Contrato Activo" />
            <Divider style={{ paddingTop: "1.5em" }} />
            <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
              Ítems del contrato
            </Typography>
            {items.fields.map((item, index) => (
              <Box key={item.id} style={{ padding: "18px 0px 15px 0px" }}>
                {index + 1}-
                <Controller
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                    <TextField
                      defaultValue={value}
                      error={Boolean(error)}
                      helperText={error && error.message}
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
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                    <TextField
                      defaultValue={value}
                      error={Boolean(error)}
                      helperText={error && error.message}
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
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                    <TextField
                      defaultValue={value}
                      error={Boolean(error)}
                      helperText={error && error.message}
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
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                    <TextField
                      defaultValue={value}
                      error={Boolean(error)}
                      helperText={error && error.message}
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
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                    <TextField
                      defaultValue={value}
                      error={Boolean(error)}
                      helperText={error && error.message}
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
                  render={({ field: { onChange, onBlur, value }, fieldState: { error } }) =>
                    <TextField
                      defaultValue={value}
                      error={Boolean(error)}
                      helperText={error && error.message}
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
              color="primary"
              variant="contained"
              onClick={() => items.append({})}
            >
              Agregar Ítems
            </Button>
            <Button
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
                  render={({ field: { onChange, onBlur, ref, value } }) =>
                    <TextField
                      defaultValue={value}
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
                  render={({ field: { onChange, onBlur, ref, value } }) =>
                    <TextField
                      defaultValue={value}
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
                  render={({ field: { onChange, onBlur } }) =>
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
            <Divider style={{ paddingTop: "1.5em" }} />
            <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
              Campos del contrato
            </Typography>
            <Box style={{ padding: "18px 0px 15px 0px" }}>
              <InputCheckbox control={control} name="campos.numero_reporte" description="Numero de Reporte" />
              <InputCheckbox control={control} name="campos.numero_orden" description="Numero de Orden" />
              <InputCheckbox control={control} name="campos.adicionales" description="Adicionales" />
              <InputCheckbox control={control} name="campos.equipo_completo" description="Equipo Completo" />
              <InputCheckbox control={control} name="campos.diametro" description="Diámetro" />
              <InputCheckbox control={control} name="campos.espesor" description="Espesor" />
              <InputCheckbox control={control} name="campos.numero_costuras" description="Número de Costuras" />
              <InputCheckbox control={control} name="campos.cantidad_placas" description="Cantidad de Placas" />
              <InputCheckbox control={control} name="campos.tipo_ensayo" description="Tipo de Ensayo RX" />

            </Box>
            <Divider style={{ marginTop: 20, marginBottom: 20 }} />
            <Button
              type="submit"
              color="primary"
              variant="contained"
            >
              Guardar Cambios
            </Button>
            <Button

              color="primary"
              variant="contained"
              onClick={() => console.log(errors)}
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