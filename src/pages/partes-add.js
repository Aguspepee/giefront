import { Box, Container, Grid, Typography } from '@mui/material';
import { PartesAddForm} from '../components/partes-add/partes-add-form';
import { DashboardLayout } from '../layout/layout';


function PartesAdd() {
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
          <PartesAddForm />
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default PartesAdd;
