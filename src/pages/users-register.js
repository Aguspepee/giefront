import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { userRegister } from '../services/users';
import { useNavigate } from "react-router-dom";

const UsersRegister = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      nombre: '',
      apellido: '',
      password: '',
      roles: "Administrador",
      policy: false
    },
    validationSchema: Yup.object({
      nombre: Yup
        .string()
        .max(255)
        .required(
          'El nombre es un campo requerido'),
      apellido: Yup
        .string()
        .max(255)
        .required(
          'El apellido en un campo requerido'),
      email: Yup
        .string()
        .email(
          'Debe ser un email válido')
        .max(255)
        .required(
          'El email es un campo requerido'),
      roles: Yup
        .string()
        .max(255)
        .required(
          'El rol en un campo requerido'),
      password: Yup
        .string()
        .max(255)
        .required(
          'La contraseña es un campo requerido'),
      policy: Yup
        .boolean()
        .oneOf(
          [true],
          'Se deben aceptar los Términos y Condiciones'
        ),
    }),
    onSubmit: async (user) => {
      console.log("Usuario",user)
      try {
        const res = await userRegister(user)
        console.log("Inició registró", res.data)
        res.data?navigate("/users-login"):console.log(res.data)
      } catch (e) {
        console.log("Hubo un error aqui",e)
        alert("error")
      }
    }
  });

  const roles = [
    {
      value: 'Administrador',
      label: 'Administrador'
    },
    {
      value: 'Supervisor',
      label: 'Supervisor'
    },
    {
      value: 'Inspector',
      label: 'Inspector'
    },
    {
      value: 'Asistente',
      label: 'Asistente'
    }
  ];

  return (
    <>
      <Box
        component="main"
        sx={{
          marginTop: 5,
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Crear una cuenta
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              error={Boolean(formik.touched.nombre && formik.errors.nombre)}
              fullWidth
              helperText={formik.touched.nombre && formik.errors.nombre}
              label="Nombre"
              margin="normal"
              name="nombre"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.nombre}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.apellido && formik.errors.apellido)}
              fullWidth
              helperText={formik.touched.apellido && formik.errors.apellido}
              label="Apellido"
              margin="normal"
              name="apellido"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.apellido}
              variant="outlined"
            />
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
            <TextField
              error={Boolean(formik.touched.roles && formik.errors.roles)}
              fullWidth
              helperText={formik.touched.roles && formik.errors.roles}
              label="Posición"
              margin="normal"
              name="roles"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={formik.values.roles}
              variant="outlined"
            >
              {roles.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))} 
            </TextField>
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Contraseña"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box
              sx={{
                alignItems: 'center',
                display: 'flex',
                ml: -1
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography
                color="textSecondary"
                variant="body2"
              >
                He leido los
                {' '}
                <Link
                  color="primary"
                  underline="always"
                  variant="subtitle2"
                >
                  Terminos y Condiciones
                </Link>
              </Typography>
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
               // disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Registrarse
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              Ya tienes una cuenta?
              {' '}
              <Link
                href="/users-login"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: 'pointer'
                }}
              >
                Iniciar Sesión
              </Link>
            </Typography>
          </form>
          {/* Footer */}
          <Typography variant="body2" color="text.secondary" align="center" sx={{ marginTop: 3 }}>
            {'Copyright © '}
            <Link color="inherit" href="http://growup-digital.com/">
              GrowUp Digital
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default UsersRegister;
