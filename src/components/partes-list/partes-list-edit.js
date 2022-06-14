import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { PartesAddForm } from './add-form/partes-add-form';
import Fab from '@mui/material/Fab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { Box, Button, CardContent, Divider, Grid, Typography } from '@mui/material';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { partesSchema } from '../../utils/yup';
import { parteCreate, parteEdit } from '../../services/partes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
import StyledCheckbox from '../../styled-components/styled-checkbox';
import { contractGetList } from '../../services/contracts';
import AutocompleteContracts from './add-form/components/autocomplete-contracts'
import StyledAutocompleteList from '../../styled-components/styled-autocomplete-list';
import StyledAdicional from '../../styled-components/styled-adicional';
import StyledItem from '../../styled-components/styled-item';
import { tipo_rx } from '../../utils/list';
import UserContext from '../../context/userContext';
import { useContext } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StyledDatepickerDesktop from '../../styled-components/styled-datepicker-desktop';
import StyledAutocompleteGet from '../../styled-components/styled-autocomplete-get';
import { userGetNames } from '../../services/users';
import DialogActions from '@mui/material/DialogActions';
import StyledAutocompleteClients from '../../styled-components/styled-autocomplete-clients';
import { clientGetAll } from '../../services/clients';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

//Icons
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Edit from '@mui/icons-material/Edit';

export default function PartesListEdit({ handleReload, handleEdit, edit, handleNotifyChange, ...props }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  /*   const [parte, setParte] = useState([]) */
  const [user, setUser] = useContext(UserContext);
  const [contract, setContract] = useState([])
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(partesSchema),
  });
  let list = contract ? contract[0]?.items : undefined
  let unidades = contract ? contract[0]?.unidades.map((unidad) => unidad.nombre) : undefined
  const items = useFieldArray({
    control,
    name: "items"
  });
  useEffect(() => {
    setContract(edit.parte.contrato)
    reset({
      contrato: edit.parte.contrato ? { nombre: edit.parte.contrato[0].nombre, _id: edit.parte.contrato[0]._id } : undefined,
      operador: edit.parte.operador ? { nombre: edit.parte.operador[0].nombre, apellido: edit.parte.operador[0].apellido, _id: edit.parte.operador[0]._id } : undefined,
      unidad: edit.parte.unidad,
      fecha_inspeccion: edit.parte.fecha_inspeccion,
      numero_reporte: edit.parte.numero_reporte,
      numero_orden: edit.parte.numero_orden,
      tag: edit.parte.tag,
      tag_detalle: edit.parte.tag_detalle,
      items: edit.parte.items,
      detalles: edit.parte.detalles,
      observaciones: edit.parte.observaciones,
      paga: edit.parte.paga ? { nombre: edit.parte.paga[0].nombre, _id: edit.parte.paga[0]._id } : undefined,
      informe_realizado: edit.parte.informe_realizado,
    });

  }, [edit.parte]);

  async function editParte(value) {
    try {
      const doc = await parteEdit({ parte: value, id: edit.parte._id, inspector: `${user.nombre} ${user.apellido}` })

      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      handleNotifyChange({
        isOpen: true,
        message: 'El parte se editó correctamente',
        type: 'success'
      })
      handleReload()
      handleEdit({ open: false, id: "" })
    } catch (e) {
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      handleNotifyChange({
        isOpen: true,
        message: 'Ha habido un error, intente nuevamente',
        type: 'error'
      })
      console.log(e)
    }
  }

  async function onSubmit(parte) {
    setConfirmDialog({
      isOpen: true,
      title: "¿Desea editar el parte?",
      subTitle: "Datos del parte",
      onConfirm: () => { editParte(parte) },
      icon: <Edit fontSize='inherit' color="success" />
    })

  }
  //Controled Accordion
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={edit.open}
        onClose={() => handleEdit({ open: false, id: "" })}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ backgroundColor: "#F3F4F6" }}>
          <IconButton disabled style={{ padding: "0em 0.2em 0.2em 0em" }}>
            <NoteAddIcon />
          </IconButton>
          {"Cargar Parte Diario"}
          <IconButton
            aria-label="close"
            onClick={() => handleEdit({ open: false, id: "" })}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <form id="myform" onSubmit={handleSubmit(data => onSubmit(data))}>
              <Typography variant="overline">
                Datos Generales
              </Typography>
              <Grid container spacing={2}>
                <AutocompleteContracts control={control} name="contrato" get={contractGetList} contract={contract} setContract={setContract} description="Contrato*" errors={errors} md={12} xs={12} size="small" />
                <StyledAutocompleteGet control={control} name="operador" get={userGetNames} description="Operador/a*" errors={errors} fullWidth margin="normal" md={12} xs={12} size="small" />
                <StyledAutocompleteList show={contract ? contract[0]?.campos[0]?.unidad : undefined} md={12} xs={12} control={control} name={`unidad`} list={unidades ? unidades : []} description="Unidad*" errors={errors} size="small" />
                <StyledDatepickerDesktop control={control} name="fecha_inspeccion" description="Fecha de Inspección*" errors={errors} md={12} xs={12} size="small" />
                <StyledTextfield show={contract ? contract[0]?.campos[0]?.numero_reporte : undefined} control={control} name={`numero_reporte`} type="text" description="Número de Reporte" errors={errors} md={12} xs={12} size="small" />
                <StyledTextfield show={contract ? contract[0]?.campos[0]?.numero_orden : undefined} control={control} name={`numero_orden`} type="text" description="Número de Orden" errors={errors} md={12} xs={12} size="small" />
              </Grid>
              <Typography variant="overline">
                Equipo
              </Typography>
              <Grid container spacing={2}>
                <StyledTextfield show={true} control={control} name={`tag`} type="text" description="TAG del equipo*" errors={errors} md={12} xs={12} size="small" />
                <StyledTextfield show={true} control={control} name={`tag_detalle`} type="text" description="Detalle del equipo" errors={errors} md={12} xs={12} size="small" />
              </Grid>

              <Typography variant="overline">
                Servicio
              </Typography>

              <Grid container spacing={2}>
                <StyledItem name={`items.0.descripcion_servicio`} errors={errors} control={control} list={list ? list : []} items={() => items.append({})} size="small" />
                {items.fields.slice(1).map((item, index) => {
                  return (
                    < StyledAdicional name={`items.${index + 1}.descripcion_servicio`} key={index} item={item} items={items} errors={errors} index={index + 1} control={control} list={list ? list : []} size="small" />
                  )
                })}
              </Grid>

              <Typography variant="overline">
                Información Adicional
              </Typography>

              <Grid container spacing={2}>
                <StyledAutocompleteClients show={contract[0]?.campos[0]?.paga} control={control} name={`paga`} get={clientGetAll} description="Paga" errors={errors} fullWidth md={12} xs={12} size="small" Icon={() => <AttachMoneyIcon />} />
                <StyledAutocompleteList show={contract[0]?.campos[0]?.tipo_rx} md={12} xs={12} control={control} name={`detalles.tipo`} list={tipo_rx} description="Tipo" errors={errors} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.diametro} control={control} name={`detalles.diametro`} type="number" description="Diámetro" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.espesor} control={control} name={`detalles.espesor`} type="number" description="Espesor" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.numero_costuras} control={control} name={`detalles.numero_costuras`} type="number" description="Número de costuras" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.cantidad_placas} control={control} name={`detalles.cantidad_placas`} type="number" description="Cantidad de Placas" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={true} control={control} name={`observaciones`} type="text" description="Observaciones" errors={errors} md={12} xs={12} size="small" multiline rows={4} />
                <StyledCheckbox show={true} control={control} name="informe_realizado" defaultValue={true} description="Informe realizado" md={12} xs={12} size="small" />
                <StyledCheckbox show={true} control={control} name="trabajo_terminado" defaultValue={true} description="Trabajo terminado" md={12} xs={12} size="small" />
              </Grid>

            </form>
          </LocalizationProvider>
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </DialogContent>
        <DialogActions >

          <Button type='submit' form="myform" color="primary" variant="contained" disabled={isSubmitting} fullWidth onClick={() => { }
          }>
            Editar Parte
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}