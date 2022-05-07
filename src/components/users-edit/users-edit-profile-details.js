import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@mui/material';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from "react-router-dom";
import { userSchema } from '../../utils/yup';
import { userOne, userEdit } from '../../services/users';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
import StyledAutocompleteList from '../../styled-components/styled-autocomplete-list';
import StyledCheckbox from '../../styled-components/styled-checkbox';
import { area, role } from '../../utils/list';

export const UsersEditProfileDetails = (props) => {
  let { id } = useParams();
  const [data, setData] = useState([])
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { control, handleSubmit, setValue, reset, formState: { errors, value } } = useForm({
    resolver: yupResolver(userSchema),
  });

  useEffect(() => {
    async function getData() {
      try {
        const document = await userOne(id)
        setData(document.data)
        console.log(document.data)
      } catch (e) {
        console.log(e)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    reset({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      role: data.role,
      area: data.area,
      active: data.active,
    });
  }, [data]);

  async function onSubmit(user) {
    try {
      const res = await userEdit(user, id)
      console.log("Se modificó el usuario", res.data)
      setSuccess(true)
      setError(false)
    } catch (e) {
      console.log(e)
      setError(true)
      setSuccess(false)
    }
  }

  return (
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
                <StyledTextfield control={control} name={`nombre`} type="text" description="Nombre" errors={errors} />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <StyledTextfield control={control} name={`apellido`} type="text" description="Apellido" errors={errors} />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <StyledAutocompleteList control={control} name={`area`} list={area} description="Área" errors={errors} />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <StyledAutocompleteList control={control} name={`role`} list={role} description="Rol" errors={errors} />
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
                md={12}
                xs={12}
              >
                <StyledCheckbox control={control} name="active" defaultValue={false} description="Usuario activo" />
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
  );
};
