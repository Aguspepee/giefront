import { Box, Container, Typography, Card } from '@mui/material';
import { PartesEditForm } from '../components/partes-edit/partes-edit-form';
import { DashboardLayout } from '../layout/layout';

function PartesEdit() {
  return (
    <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Typography
            sx={{ mb: 3 }}
            variant="h4"
          >
            Editar Parte Diario
          </Typography>
          <Card> 
          <PartesEditForm />
          </Card>
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default PartesEdit;
