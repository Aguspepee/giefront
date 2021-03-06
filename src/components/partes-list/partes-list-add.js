import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import { Tooltip } from "@mui/material";
import { useEffect, useState } from 'react';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { partesSchema } from '../../utils/yup';
import { parteCreate } from '../../services/partes';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
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

export default function PartesListAdd({ handleReload }) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  //let { id } = useParams();

  const [user, setUser] = useContext(UserContext);
  const [contract, setContract] = useState([])
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(partesSchema),
  });
  let list = contract[0]?.items
  let unidades = contract[0]?.unidades.map((unidad) => unidad.nombre)
  let certificantes = contract[0]?.certificantes.map((certificante) => certificante.nombre)

  //Setea el usuario como operador
  useEffect(() => {
    reset({
      operador: { _id: user._id, nombre: user.nombre, apellido: user.apellido },
    });

  }, [user, setUser, open]);

  const items = useFieldArray({
    control,
    name: "items"
  });

  async function addParte(parte) {
    //Si se seleccion?? un cliente de "Paga", pone el ID de ese cliente, sino, pone el ID del cliente del contrato.
    let paga = parte.paga ? parte.paga : contract[0].cliente[0]._id
    try {
      const doc = await parteCreate({ ...parte, inspector: `${user.nombre} ${user.apellido}`, paga: paga })
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      setNotify({
        isOpen: true,
        message: 'El parte de agreg?? correctamente',
        type: 'success'
      })
      handleClose()
      handleReload()
      console.log(doc)
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

  async function onSubmit(parte) {
    setConfirmDialog({
      isOpen: true,
      title: "??Desea agregar el parte?",
      subTitle: "Datos del parte",
      onConfirm: () => { addParte(parte) },
      icon: <AddCircleOutlineIcon fontSize='inherit' color="success" />
    })
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ '& > :not(style)': { m: 1 } }}>
        <Tooltip title="Nuevo Parte Diario">
          <Fab size="small" color="primary" aria-label="add" onClick={handleClickOpen}>
            <NoteAddIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Dialog

        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle id="responsive-dialog-title" style={{ backgroundColor: "#F3F4F6" }}>
          <IconButton disabled style={{ padding: "0em 0.2em 0.2em 0em" }}>
            <NoteAddIcon />
          </IconButton>
          {"Cargar Parte Diario"}

          <IconButton
            aria-label="close"
            onClick={handleClose}
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

              <Box style={{ paddingTop: "1em", paddingBottom: "0.5em" }}>
                <Typography variant="overline">
                  Datos Generales
                </Typography>
                <Divider />
              </Box>
              <Grid container spacing={2}>
                <AutocompleteContracts control={control} name="contrato" get={contractGetList} contract={contract} setContract={setContract} description="Contrato*" errors={errors} md={12} xs={12} size="small" />
                <StyledAutocompleteGet control={control} name="operador" get={userGetNames} description="Operador/a*" errors={errors} fullWidth margin="normal" md={12} xs={12} size="small" />
                <StyledAutocompleteList show={contract[0]?.campos[0]?.unidad} md={12} xs={12} control={control} name={`unidad`} list={unidades ? unidades : []} description="Unidad*" errors={errors} size="small" />
                <StyledDatepickerDesktop control={control} name="fecha_inspeccion" description="Fecha de Inspecci??n*" errors={errors} md={12} xs={12} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.numero_reporte} control={control} name={`numero_reporte`} type="text" description="N??mero de Reporte" errors={errors} md={12} xs={12} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.numero_orden} control={control} name={`numero_orden`} type="text" description="N??mero de Orden" errors={errors} md={12} xs={12} size="small" />
                <StyledAutocompleteList show={true} md={12} xs={12} control={control} name={`certificante`} list={certificantes ? certificantes : []} description="Certificante" errors={errors} size="small" />
              </Grid>

              <Box style={{ paddingTop: "1em", paddingBottom: "0.5em" }}>
                <Typography variant="overline">
                  Equipo
                </Typography>
                <Divider />
              </Box>
              <Grid container spacing={2}>
                <StyledTextfield show={true} control={control} name={`tag`} type="text" description="TAG del equipo*" errors={errors} md={12} xs={12} size="small" />
                <StyledTextfield show={true} control={control} name={`tag_detalle`} type="text" description="Detalle del equipo" errors={errors} md={12} xs={12} size="small" />
              </Grid>

              <Box style={{ paddingTop: "1em", paddingBottom: "0.5em" }}>
                <Typography variant="overline">
                  Servicio
                </Typography>
                <Divider />
              </Box>
              <Grid container spacing={2}>
                <StyledItem name={`items.0.descripcion_servicio`} errors={errors} control={control} list={list ? list : []} items={() => items.append({})} size="small" />
                {items.fields.slice(1).map((item, index) => (
                  < StyledAdicional name={`items.${index + 1}.descripcion_servicio`} key={item.id} item={item} items={items} errors={errors} index={index + 1} control={control} list={list ? list : []} size="small" />
                ))}
              </Grid>

              <Box style={{ paddingTop: "1em", paddingBottom: "0.5em" }}>
                <Typography variant="overline" >
                  Informaci??n Adicional
                </Typography>
                <Divider />
              </Box>
              <Grid container spacing={2}>
                <StyledAutocompleteClients show={contract[0]?.campos[0]?.paga} control={control} name={`paga`} get={clientGetAll} description="Paga" errors={errors} fullWidth md={12} xs={12} size="small" />
                <StyledAutocompleteList show={contract[0]?.campos[0]?.tipo_rx} md={12} xs={12} control={control} name={`detalles.tipo`} list={tipo_rx} description="Tipo" errors={errors} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.diametro} control={control} name={`detalles.diametro`} type="number" description="Di??metro" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.espesor} control={control} name={`detalles.espesor`} type="number" description="Espesor" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.numero_costuras} control={control} name={`detalles.numero_costuras`} type="number" description="N??mero de costuras" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={contract[0]?.campos[0]?.cantidad_placas} control={control} name={`detalles.cantidad_placas`} type="number" description="Cantidad de Placas" errors={errors} md={6} xs={6} size="small" />
                <StyledTextfield show={true} control={control} name={`observaciones`} type="text" description="Observaciones" errors={errors} md={12} xs={12} size="small" multiline rows={4} />
                {/*   <StyledCheckbox show={true} control={control} name="informe_realizado" defaultValue={true} description="Informe realizado" md={12} xs={12} size="small" />
                <StyledCheckbox show={true} control={control} name="trabajo_terminado" defaultValue={true} description="Trabajo terminado" md={12} xs={12} size="small" /> */}
              </Grid>

            </form>
          </LocalizationProvider>
          <Notification
            notify={notify}
            setNotify={setNotify} />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
          />
        </DialogContent>
        <DialogActions >

          <Button type='submit' form="myform" color="primary" variant="contained" disabled={isSubmitting} fullWidth onClick={() => { }
          }>
            A??adir Parte
          </Button>
          {/*             <Button
              color="primary"
              variant="contained"
              onClick={() => console.log(errors)}
            >
              Errores
            </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}