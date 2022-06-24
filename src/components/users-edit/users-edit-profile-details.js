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
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from "react-router-dom";
import { userEditSchema } from '../../utils/yup';
import { userEdit } from '../../services/users';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
import StyledAutocompleteList from '../../styled-components/styled-autocomplete-list';
import StyledCheckbox from '../../styled-components/styled-checkbox';
import { area, role } from '../../utils/list';
import EditIcon from '@mui/icons-material/Edit';

//Alerts y Notifications
import Notification from '../../styled-components/alerts/notification';
import ConfirmDialog from '../../styled-components/alerts/confirm-dialog';

export const UsersEditProfileDetails = ({handleReload,user,...props}) => {
  let { id } = useParams();
  const [notify, setNotify] = useState({ isOpen: false, message: "", type: "success" })
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: "", subTitle: "" })
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(userEditSchema),
  });

  async function editUser(user) {
    try {
      await userEdit(user, id)
      setConfirmDialog({
        ...confirmDialog,
        isOpen: false
      })
      handleReload()
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

  useEffect(() => {
    reset({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      role: user.role,
      area: user.area,
      active: user.active,
      numero_orden: user.numero_orden
    });
  }, [user]);

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <form onSubmit={handleSubmit(user => onSubmit(user))}>
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
                  <StyledCheckbox show={true} control={control} name="active" defaultValue={false} description="Usuario activo" />
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
