import { useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import StyledPassword from '../../styled-components/styled-password';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../../utils/yup';
import { useForm } from "react-hook-form";
import EditIcon from '@mui/icons-material/Edit';
import { useParams } from "react-router-dom";

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';
import { userEdit } from '../../services/users';

export const UsersEditPassword = (props) => {
  let { id } = useParams();
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  async function editUser(user) {
    try {
      await userEdit(user, id)
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      props.setReload(!props.reload)
      setNotify({
        isOpen: true,
        message: `El perfil de ${user.nombre} se modificó correctamente`,
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

  async function onSubmit(user) {
    setConfirmDialog({
      isOpen: true,
      title: `¿Desea modificar el perfil de ${user.nombre}?`,
      subTitle: "",
      onConfirm: () => { editUser(user) },
      icon: <EditIcon fontSize='inherit' color="success" />
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(user => onSubmit(user))}>
        <Card>
          <CardHeader
            subheader="Escriba la nueva contraseña"
            title="Contraseña"
          />
          <Divider />
          <CardContent>
            <Grid container
              spacing={3}>
              <StyledPassword show={true} control={control} name={`password`} type="text" description="Contraseña" errors={errors} md={12} sm={12}/>
              <StyledPassword show={true} control={control} name={`confirm`} type="text" description="Contraseña" errors={errors}  md={12} sm={12}/>
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
              Cambiar contraseña
            </Button>
          </Box>
        </Card>
      </form>
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
