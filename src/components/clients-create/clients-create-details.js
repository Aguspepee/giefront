import { useState } from 'react';
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

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

export const ClientCreateDetails = (props) => {

  const formik = useFormik({
    initialValues: {
      nombre: '',
      direccion: '',
      email: '',
      telefono: "",
      abreviatura: "",
      deleted: "",
      image: ""
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
    <form form onSubmit={formik.handleSubmit} >
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
              <TextField
                error={Boolean(formik.touched.nombre && formik.errors.nombre)}
                fullWidth
                helperText={formik.touched.nombre && formik.errors.nombre}
                label="Nombre"
                margin="normal"
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
                error={Boolean(formik.touched.direccion && formik.errors.direccion)}
                fullWidth
                helperText={formik.touched.direccion && formik.errors.direccion}
                label="Dirección"
                margin="normal"
                name="direccion"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="direccion"
                value={formik.values.direccion}
                variant="outlined"
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
                margin="normal"
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
                margin="normal"
                name="telefono"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="number"
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
                error={Boolean(formik.touched.abreviatura && formik.errors.abreviatura)}
                fullWidth
                helperText={formik.touched.abreviatura && formik.errors.abreviatura}
                label="Abreviatura"
                margin="normal"
                name="abreviatura"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="abreviatura"
                value={formik.values.abreviatura}
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
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
