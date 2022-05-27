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
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

export const UsersEditProfile = (props) => {
  const user = props.user;
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })

  useEffect(() => {

  }, [user])

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
              src={user.avatar}
              sx={{
                height: 64,
                mb: 2,
                width: 64
              }}
            />
            <Typography
              color="textPrimary"
              gutterBottom
              variant="h5"
            >
              {`${user.nombre} ${user.apellido}`}
            </Typography>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              {`${user.role}`}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
          >
            Cambiar foto de perfil
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
  )
}
