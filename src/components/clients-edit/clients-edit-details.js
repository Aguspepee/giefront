import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
} from '@mui/material';
import { useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from "react-router-dom";
import { clientSchema } from '../../utils/yup';
import { clientEdit } from '../../services/clients';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
import StyledCheckbox from '../../styled-components/styled-checkbox';
import EditIcon from '@mui/icons-material/Edit';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';


export const ClientsEditDetails = (props) => {
  let { id } = useParams();
  const client = props.client;
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, setValue, reset, formState: { errors, value } } = useForm({
    resolver: yupResolver(clientSchema),
  });

  useEffect(() => {
    reset({
      nombre: client.nombre,
      abreviatura: client.abreviatura,
      email: client.email,
      direccion: client.direccion,
      telefono: client.telefono,
      active: client.active,
    });
  }, [client]);

  async function editClient(client) {
    try {
      const res = await clientEdit(client, id)
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      props.setReload(!props.reload)
      setNotify({
        isOpen: true,
        message: `El perfil de ${client.nombre} se modificó correctamente`,
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

  async function onSubmit(client) {
    setConfirmDialog({
      isOpen: true,
      title: `¿Desea modificar el perfil de ${client.nombre}?`,
      subTitle: "",
      onConfirm: () => { editClient(client) },
      icon: <EditIcon fontSize='inherit' color="success" />
    })
  }


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(data => onSubmit(data))}>
          <Card>
            <CardHeader
              subheader="Edite la información y guarde los cambios"
              title="Perfil"
            />
            <Divider />
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <StyledTextfield control={control} disabled name={`nombre`} type="text" description="Nombre" errors={errors} />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <StyledTextfield control={control} name={`abreviatura`} type="text" description="Abreviatura" errors={errors} />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <StyledTextfield control={control} name={`email`} type="email" description="Email" errors={errors} />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <StyledTextfield control={control} name={`telefono`} type="text" description="Teléfono" errors={errors} />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <StyledTextfield control={control} name={`direccion`} type="text" description="Dirección" errors={errors} />
                </Grid>

                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <StyledCheckbox control={control} name="active" defaultValue={false} description="Cliente activo" />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2
              }}
            >
              <Button
                type="submit"
                color="primary"
                variant="contained"
              >
                Guardar Cambios
              </Button>
            </Box>
          </Card>
        </form>
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
};
