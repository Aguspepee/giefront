import React from 'react';
import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { clientImage } from '../../services/clients';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

export const ClientsEditProfile = (props) => {
  const client = props.client;
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })


  useEffect(() => {

  }, [client])

  async function changePicture(event) {
    const formData = new FormData();
    formData.append("userImage", event.target.files[0]);
    try {
      await clientImage(client._id, formData)
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

  async function handleFileSelect(event) {
    setConfirmDialog({
      isOpen: true,
      title: `¿Desea modificar el perfil de ${client.nombre}?`,
      subTitle: "",
      onConfirm: () => { changePicture(event) },
      icon: <InsertPhotoIcon fontSize='inherit' color="success" />
    })
  }

  return (
    <>
      <Card >
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={client.image ? `${process.env.REACT_APP_BACKEND_URL}${client.image}` : ""}
              sx={{
                height: 200,
                mb: 0,
                width: 200
              }}
              client={client}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {client.abreviatura}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {client.nombre}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
            component="label"
          >
            Cambiar foto de perfil
            <input
              type="file"
              hidden

              onChange={handleFileSelect}
            />
          </Button>
        </CardActions>
      </Card>
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
