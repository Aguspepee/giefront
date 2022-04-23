import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Link, TextField, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { userLogin } from '../services/users';
import { useNavigate } from "react-router-dom";

const UsersLogin = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email(
          'Debe ser un email válido')
        .max(255)
        .required(
          'El email es un campo requerido'),
      password: Yup
        .string()
        .max(255)
        .required(
          'La contraseña es un campo requerido')
    }),
    onSubmit: async (user) => {
      console.log(user)
      try {
        const res = await userLogin(user)
        localStorage.setItem("token", res.data.token)
        console.log("inición sesión", res.data)
        res.data.token?navigate("/"):console.log(res.data.message)
      } catch (e) {
        console.log(e)
      }
    }
  });

  return (
    <>
      <Box
        component="main"
        sx={{
          marginTop: 8,
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar sesión
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
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
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Iniciar sesión
              </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body2"
            >
              No tenes una cuenta?
              {" "}
              <Link
                href="/register"
                variant="subtitle2"
                underline="hover"
                sx={{
                  cursor: 'pointer'
                }}
              >
                Registrate!
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

export default UsersLogin;
