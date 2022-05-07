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
import { clientSchema } from '../../utils/yup';
import { clientOne, clientEdit } from '../../services/clients';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import StyledTextfield from '../../styled-components/styled-textfield';
import StyledAutocompleteList from '../../styled-components/styled-autocomplete-list';
import StyledCheckbox from '../../styled-components/styled-checkbox';
import { area, role } from '../../utils/list';
 
export const ClientsEditDetails = (props) => {
  let { id } = useParams();
  const [data, setData] = useState([])
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { control, handleSubmit, setValue, reset, formState: { errors, value } } = useForm({
    resolver: yupResolver(clientSchema),
  });

  useEffect(() => {
    async function getData() {
      try {
        const document = await clientOne(id)
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
      abreviatura: data.abreviatura,
      email: data.email,
      direccion: data.direccion,
      telefono: data.telefono,
      active: data.active,
    });
  }, [data]);

  async function onSubmit(client) {
    try {
      const res = await clientEdit(client, id)
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
  );
};
