import * as Yup from 'yup';
import { useFormik } from 'formik';

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
import { clientCreate } from '../../services/clients';

export const ClientCreateDetails = (props) => {

  const formik = useFormik({
    initialValues: {
      nombre: '',
      direccion: '',
      email: '',
      telefono: '',
      abreviatura: '',
      image: ''
    },
    validationSchema: Yup.object({
      nombre: Yup
        .string()
        .max(255)
        .required(
          'El email es un campo requerido'),
      direccion: Yup
        .string()
        .max(255)
        .required(
          'El email es un campo requerido'),
      email: Yup
        .string()
        .max(255)
        .email('El email debe ser válido')
        .required(
          'El email es un campo requerido'),
      telefono: Yup
        .string()
        .max(255)
        .required(
          'El email es un campo requerido'),
      abreviatura: Yup
        .string()
        .max(255)
        .required(
          'El email es un campo requerido'),
    }),

    onSubmit: async (client) => {
      console.log("contrato", client)
      try {
        const res = await clientCreate(client)
        console.log("Se creó el cliente", res.data)
      } catch (e) {
        console.log(e)
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} >
      <Card>
        <CardHeader
          subheader="Edite la información y guarde los cambios. Al finalizar, podrá ir a editar el cliente y cargarle una foto de perfil."
          title="Perfil"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.nombre && formik.errors.nombre)}
                fullWidth
                helperText={formik.touched.nombre && formik.errors.nombre}
                label="Nombre"
                name="nombre"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="nombre"
                value={formik.values.nombre}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.abreviatura && formik.errors.abreviatura)}
                fullWidth
                helperText={formik.touched.abreviatura && formik.errors.abreviatura}
                label="Abreviatura"
                name="abreviatura"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="abreviatura"
                value={formik.values.abreviatura}
                variant="outlined"
                inputProps={{ maxLength: 3, style: { textTransform: "uppercase" } }}
              />
            </Grid>

            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.telefono && formik.errors.telefono)}
                fullWidth
                helperText={formik.touched.telefono && formik.errors.telefono}
                label="Teléfono"
                name="telefono"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="string"
                value={formik.values.telefono}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                error={Boolean(formik.touched.direccion && formik.errors.direccion)}
                fullWidth
                helperText={formik.touched.direccion && formik.errors.direccion}
                label="Dirección"
                name="direccion"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="direccion"
                value={formik.values.direccion}
                variant="outlined"
              />
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
            color="primary"
            //disabled={formik.isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Crear Cliente
          </Button>
        </Box>
      </Card>
    </form>
  );
};
