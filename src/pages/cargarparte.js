import { Box, Container, Grid, Typography } from '@mui/material';
import { FormularioParte } from '../components/cargarparte/formulario-parte';
import { DashboardLayout } from '../components/dashboard-layout';


function CargarParteDiario() {
  return (
    <DashboardLayout>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Cargar Parte Diario
          </Typography>
          <FormularioParte />
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default CargarParteDiario;
