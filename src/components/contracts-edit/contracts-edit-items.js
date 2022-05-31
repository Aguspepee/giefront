import { React, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Box, Card, CardContent, Button, Divider, TextField, IconButton, Tooltip, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { contractEdit, contractOne } from "../../services/contracts";
import InputCheckbox from "./components/contracts-edit-items-checkbox"
import InputAutocompleteGet from "./components/contracts-edit-items-autocomplete-get";
import InputAutocompleteList from "./components/contracts-edit-items-autocomplete-list";
import { useParams } from "react-router-dom";
import StyledDatepickerDesktop from "../../styled-components/styled-datepicker-desktop";
//Icons
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
//GET listas
import { clientGetNames } from '../../services/clients'
//Listados
import { unidades_medida, tipos_actividad, subtipos_actividad, area } from "../../utils/list";
//YUP Schema
import { contractSchema } from '../../utils/yup'
import InputTexfield from "./components/contracts-edit-items-textfield";
//Icons
import EditIcon from '@mui/icons-material/Edit';
//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

function ContractsEditItems() {
  let { id } = useParams();
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const [data, setData] = useState([])
  const { control, handleSubmit,  reset, formState: { errors} } = useForm({
    resolver: yupResolver(contractSchema),
  });

  useEffect(() => {
    async function getData() {
      try {
        const document = await contractOne(id)
        setData(document.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    reset({
      nombre: data.nombre,
      descripcion: data.descripcion,
      area: data.area,
      cliente: data.cliente,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      activo: data.activo,
      unidades: data.unidades,
      items: data.items,
      certificantes: data.certificantes,
      campos: {
        numero_reporte: data.campos ? data.campos[0].numero_reporte : false,
        numero_orden: data.campos ? data.campos[0].numero_orden : false,
        adicionales: data.campos ? data.campos[0].adicionales : false,
        equipo_completo: data.campos ? data.campos[0].equipo_completo : false,
        diametro: data.campos ? data.campos[0].diametro : false,
        espesor: data.campos ? data.campos[0].espesor : false,
        numero_costuras: data.campos ? data.campos[0].numero_costuras : false,
        cantidad_placas: data.campos ? data.campos[0].cantidad_placas : false,
        tipo_rx: data.campos ? data.campos[0].tipo_rx : false,
      }
    });
  }, [data]);

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


  async function editContract(contract) {
    try {
      await contractEdit(contract, id)
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      setNotify({
        isOpen: true,
        message: `El perfil de se modificó correctamente`,
        type: 'success'
      })
    } catch (e) {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      setNotify({
        isOpen: true,
        message: 'Ha habido un error, intente nuevamente',
        type: 'error'
      })
      console.log(e)
    }
  }
  async function onSubmit(contract) {
    setConfirmDialog({
      isOpen: true,
      title: `¿Desea modificar el contrato?`,
      subTitle: "",
      onConfirm: () => { editContract(contract) },
      icon: <EditIcon fontSize='inherit' color="success" />
    })
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Card >
          <CardContent>
            <form onSubmit={handleSubmit(data => onSubmit(data))}>
              <Typography variant="h6" gutterBottom component="div">
                Datos generales
              </Typography>
              <InputTexfield control={control} disabled name={`nombre`} type="text" description="Nombre del Contrato" errors={errors} />
              <InputTexfield control={control} name={`descripcion`} multiline rows={4} type="text" description="Descripción del Contrato" errors={errors} />
              <InputAutocompleteList control={control} name={`area`} list={area} description="Área" errors={errors} />
              <InputAutocompleteGet control={control} name="cliente" get={clientGetNames} description="Cliente" errors={errors} />
              <StyledDatepickerDesktop control={control} name="fecha_inicio" description="Fecha de Inicio" errors={errors} />
              <StyledDatepickerDesktop control={control} name="fecha_fin" description="Fecha de Fin" errors={errors} />
              <InputCheckbox control={control} name="activo" defaultValue={false} description="Contrato Activo" />
              <Divider style={{ paddingTop: "1.5em" }} />
              <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
                Ítems del contrato
              </Typography>
              {items.fields.map((item, index) => (
                <Box key={item.id} style={{ padding: "18px 0px 15px 0px" }}>
                  {index + 1}-
                  <InputTexfield control={control} name={`items.${index}.descripcion_servicio`} type="text" description="Descripción" errors={errors} />
                  <InputTexfield control={control} name={`items.${index}.codigo_servicio`} type="text" description="Código de Servicio" errors={errors} />
                  <InputAutocompleteList control={control} name={`items.${index}.tipo_actividad`} list={tipos_actividad} description="Tipo de Actividad" errors={errors} />
                  <InputAutocompleteList control={control} name={`items.${index}.clase`} list={subtipos_actividad} description="Subtipo de Actividad" errors={errors} />
                  <InputTexfield control={control} name={`items.${index}.valor`} type="number" description="Valor" errors={errors} />
                  <InputAutocompleteList control={control} name={`items.${index}.unidad_medida`} list={unidades_medida} description="Unidad de Medida" errors={errors} />
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
                    render={({ field: { onChange, onBlur, ref, value } }) =>
                      <TextField
                        defaultValue={value}
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
                    render={({ field: { onChange, onBlur, ref, value } }) =>
                      <TextField
                        defaultValue={value}
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
                <InputCheckbox control={control} name="campos.tipo_rx" description="Tipo de Ensayo RX" />
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
      <Notification
        notify={notify}
        setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}

export default ContractsEditItems