import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { userRegister } from '../services/users';
import { userAddSchema } from '../utils/yup';
import { useForm } from "react-hook-form";
import { DashboardLayout } from '../layout/layout';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';
import { area, role } from '../utils/list';
import StyledTextfield from '../styled-components/styled-textfield';
import StyledAutocompleteList from '../styled-components/styled-autocomplete-list';
import EditIcon from '@mui/icons-material/Edit';
import StyledPassword from '../styled-components/styled-password';

//Alerts y Notifications
import Notification from '../styled-components/alerts/notification';
import ConfirmDialog from '../styled-components/alerts/confirm-dialog';


const UsersCreate = (props) => {
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userAddSchema),
  });

  async function createUser(user) {

    try {
      const usuario = await userRegister(user)
      console.log(usuario)
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
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
    console.log(user)
    setConfirmDialog({
      isOpen: true,
      title: `¿Desea crear el perfil de ${user.nombre}?`,
      subTitle: "",
      onConfirm: () => { createUser(user) },
      icon: <EditIcon fontSize='inherit' color="success" />
    })
  }

  return (
    <>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4
          }}
        >

          <Container maxWidth="md">
            <Typography
              sx={{ mb: 3 }}
              variant="h4"
            >
              Registrar Usuario
            </Typography>
            <Card>
              <CardHeader
                subheader="Edite la información y registre el usuario"
                title="Usuario"
              />
              <Divider />

              <form onSubmit={handleSubmit(user => onSubmit(user))}>
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
                      <StyledTextfield show={true} control={control} name={`nombre`} type="text" description="Nombre" errors={errors} />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <StyledTextfield show={true} control={control} name={`apellido`} type="text" description="Apellido" errors={errors} />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <StyledAutocompleteList show={true} control={control} name={`area`} list={area} description="Área" errors={errors} />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <StyledAutocompleteList show={true} control={control} name={`role`} list={role} description="Rol" errors={errors} />
                    </Grid>
                    <Grid
                      item
                      md={12}
                      xs={12}
                    >
                      <StyledTextfield show={true} control={control} name={`email`} type="email" description="Email" errors={errors} />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <StyledTextfield show={true} control={control} name={`numero_orden`} type="text" description="Número de Orden" errors={errors} />
                    </Grid>
                    <Grid
                      item
                      md={6}
                      xs={12}
                    >
                      <StyledPassword show={true} control={control} name={`password`} type="text" description="Contraseña" errors={errors} />
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
                    Registrar Usuario
                  </Button>
                </Box>

              </form>

            </Card>
          </Container>

        </Box>
      </DashboardLayout>
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

export default UsersCreate;
