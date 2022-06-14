import { React, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Box, Card, Button, Divider, TextField, IconButton, Tooltip, Typography, Paper, Grid } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { contractEdit, contractOne } from "../../services/contracts";
import InputCheckbox from "./components/contracts-edit-items-checkbox"
import InputAutocompleteList from "./components/contracts-edit-items-autocomplete-list";
import { useParams } from "react-router-dom";
import StyledDatepickerDesktop from "../../styled-components/styled-datepicker-desktop";
import StyledAutocompleteClients from "../../styled-components/styled-autocomplete-clients";
//Icons
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
//GET listas
import { clientGetAll } from '../../services/clients'
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
import { TableContainer } from "@mui/material";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Stack } from "@mui/material";

import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Fab from '@mui/material/Fab';

function ContractsEditItems() {
  let { id } = useParams();
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const [data, setData] = useState([])
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(contractSchema),
  });

  //Tabs
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function getData() {
      try {
        const document = await contractOne(id)
        console.log(document)
        setData(document.data[0])
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
      cliente: data.cliente ? data.cliente[0] : null,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      activo: data.activo,
      unidades: data.unidades,
      items: data.items,
      certificantes: data.certificantes,
      campos: {
        numero_reporte: data.campos ? data.campos[0].numero_reporte : false,
        numero_orden: data.campos ? data.campos[0].numero_orden : false,
        equipo_completo: data.campos ? data.campos[0].equipo_completo : false,
        diametro: data.campos ? data.campos[0].diametro : false,
        espesor: data.campos ? data.campos[0].espesor : false,
        numero_costuras: data.campos ? data.campos[0].numero_costuras : false,
        cantidad_placas: data.campos ? data.campos[0].cantidad_placas : false,
        tipo_rx: data.campos ? data.campos[0].tipo_rx : false,
        unidad: data.campos ? data.campos[0].unidad : false,
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
      const hola = await contractEdit(contract, id)
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
          <Paper sx={{ overflowX: "auto", width: "100%", }}>
            <Box sx={{ width: '100%' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Box
                    sx={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'space-between',
                      // flexWrap: 'wrap',

                    }}
                  >
                    <TabList onChange={handleChange}
                      aria-label="lab API tabs example"
                      variant="scrollable"
                      scrollButtons="auto"
                      value={value}>

                      <Tab label="Datos Generales" value="1" />
                      <Tab label="Ítems del contrato" value="2" />
                      <Tab label="Unidades" value="3" />
                      <Tab label="Certificantes" value="4" />
                      <Tab label="Campos" value="5" />
                    </TabList>

                    <Box sx={{ m: 1 }}>
                      <Tooltip title="Guardar cambios">
                        <Fab size="small" color="primary" aria-label="add" >
                          <SaveIcon />
                        </Fab>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                <TabPanel value="1">
                  <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <InputTexfield control={control} name={`nombre`} type="text" description="Nombre del Contrato" errors={errors} fullWidth margin="normal" />
                    <InputTexfield control={control} name={`descripcion`} multiline rows={4} type="text" description="Descripción del Contrato" errors={errors} fullWidth margin="normal" />
                    <Grid container spacing={3}    >
                      <Grid item lg={6} sm={6} xl={6} xs={12} >
                        <InputAutocompleteList control={control} name={`area`} list={area} description="Área" errors={errors} fullWidth margin="normal" />
                      </Grid>
                      <Grid item lg={6} sm={6} xl={6} xs={12} >
                        <StyledAutocompleteClients control={control} name="cliente" get={clientGetAll} description="Cliente" errors={errors} fullWidth margin="normal" />
                      </Grid>
                      <Grid item lg={6} sm={6} xl={6} xs={12} >
                        <StyledDatepickerDesktop control={control} name="fecha_inicio" description="Fecha de Inicio" errors={errors} fullWidth margin="normal" />
                      </Grid>
                      <Grid item lg={6} sm={6} xl={6} xs={12} >
                        <StyledDatepickerDesktop control={control} name="fecha_fin" description="Fecha de Fin" errors={errors} fullWidth margin="normal" />
                      </Grid>
                    </Grid>
                    <InputCheckbox control={control} name="activo" defaultValue={false} description="Contrato Activo" />
                  </form>
                </TabPanel>
                <TabPanel value="2" style={{ padding: "0em 0em 1em 0em" }}>
                  <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                        <TableHead style={{ height: "50px" }}>
                          <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Descripción del Servicio</TableCell>
                            <TableCell align="right">Código del Servicio</TableCell>
                            <TableCell align="right">Tipo de Actividad</TableCell>
                            <TableCell align="right">Subtipo de Actividad</TableCell>
                            <TableCell align="right">Valor</TableCell>
                            <TableCell align="right">Unidad de Medida</TableCell>
                            <TableCell align="right"></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {items.fields.map((item, index) => (
                            <TableRow
                              key={item.id}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell component="th" scope="row">{index + 1}</TableCell>
                              <TableCell align="left" style={{ minWidth: "500px" }}>
                                <InputTexfield control={control} name={`items.${index}.descripcion_servicio`} type="text" description="" errors={errors} multiline maxRows={4} fullWidth />
                              </TableCell>
                              <TableCell align="right">
                                <InputTexfield control={control} name={`items.${index}.codigo_servicio`} type="text" description="" errors={errors} />
                              </TableCell>
                              <TableCell align="right">
                                <InputAutocompleteList control={control} name={`items.${index}.tipo_actividad`} list={tipos_actividad} description="" errors={errors} />
                              </TableCell>
                              <TableCell align="right">
                                <InputAutocompleteList control={control} name={`items.${index}.clase`} list={subtipos_actividad} description="" errors={errors} />
                              </TableCell>
                              <TableCell align="right">
                                <InputTexfield control={control} name={`items.${index}.valor`} type="number" description="" errors={errors} />
                              </TableCell>
                              <TableCell align="right">
                                <InputAutocompleteList control={control} name={`items.${index}.unidad_medida`} list={unidades_medida} description="" errors={errors} />
                              </TableCell>
                              <TableCell align="right">
                                <Stack direction="row">
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
                                </Stack>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Stack direction="row" spacing={2}>
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
                    </Stack>
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
                </TabPanel>
                <TabPanel value="3">
                  <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                      <TableHead style={{ height: "50px" }}>
                        <TableRow>
                          <TableCell>
                            #
                          </TableCell>
                          <TableCell>
                            Nombre de la Unidad
                          </TableCell>
                          <TableCell>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {unidades.fields.map((unidad, index) => (
                          <TableRow
                            key={unidad.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              {index + 1}
                            </TableCell>
                            <TableCell align="left">
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
                                    fullWidth
                                  />}
                                name={`unidades.${index}.nombre`}
                                control={control}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Stack direction="row">
                                <Tooltip title="Subir un nivel">
                                  <IconButton sx={{ ml: 1 }} onClick={() => unidades.move(index, index !== 0 ? index - 1 : index)}>
                                    <ArrowUpwardIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Bajar un nivel">
                                  <IconButton sx={{ ml: 1 }} onClick={() => unidades.move(index, index + 1)}>
                                    <ArrowDownwardIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar Item">
                                  <IconButton sx={{ ml: 1 }} onClick={() => unidades.remove(index)}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>))}
                      </TableBody>
                    </Table>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => unidades.append({})}
                    >
                      Agregar Unidades
                    </Button>
                  </form>
                </TabPanel>
                <TabPanel value="4">
                  <form onSubmit={handleSubmit(data => onSubmit(data))}>
                    <Typography variant="h6" gutterBottom component="div" style={{ paddingTop: "1em" }}>
                      Certificantes
                    </Typography>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                      <TableHead>
                        <TableRow style={{ height: "50px" }}>
                          <TableCell></TableCell>
                          <TableCell align="left">Nombre del certificante</TableCell>
                          <TableCell align="right"></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {certificantes.fields.map((certificante, index) => (
                          <TableRow
                            key={certificante.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell>
                              {index + 1}
                            </TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell align="right">
                              <Stack direction="row">
                                <Tooltip title="Subir un nivel">
                                  <IconButton sx={{ ml: 1 }} onClick={() => certificantes.move(index, index !== 0 ? index - 1 : index)}>
                                    <ArrowUpwardIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Bajar un nivel">
                                  <IconButton sx={{ ml: 1 }} onClick={() => certificantes.move(index, index + 1)}>
                                    <ArrowDownwardIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar Item">
                                  <IconButton sx={{ ml: 1 }} onClick={() => certificantes.remove(index)}>
                                    <DeleteIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>))}
                      </TableBody>
                    </Table>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => certificantes.append({})}
                    >
                      Agregar Certificantes
                    </Button>
                  </form>
                </TabPanel>
                <TabPanel value="5">
                  <form component={'span'} onSubmit={handleSubmit(data => onSubmit(data))}>

                    <Box style={{ padding: "18px 0px 15px 0px" }}>
                      <InputCheckbox control={control} name="campos.numero_reporte" description="Numero de Reporte" />
                      <InputCheckbox control={control} name="campos.numero_orden" description="Numero de Orden" />
                      <InputCheckbox control={control} name="campos.unidad" description="Unidad" />
                      <InputCheckbox control={control} name="campos.equipo_completo" description="Equipo Completo" />
                      <InputCheckbox control={control} name="campos.diametro" description="Diámetro" />
                      <InputCheckbox control={control} name="campos.espesor" description="Espesor" />
                      <InputCheckbox control={control} name="campos.numero_costuras" description="Número de Costuras" />
                      <InputCheckbox control={control} name="campos.cantidad_placas" description="Cantidad de Placas" />
                      <InputCheckbox control={control} name="campos.tipo_rx" description="Tipo de Ensayo RX" />
                      <InputCheckbox control={control} name="campos.paga" description="Paga" />
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
                </TabPanel>
              </TabContext>
            </Box>
          </Paper>
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