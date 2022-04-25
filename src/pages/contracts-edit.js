import { Box, Container, Grid, Typography } from '@mui/material';
import { ContractsEditItems } from '../components/contracts-edit/contracts-edit-items';
import { DashboardLayout } from '../layout/layout';


function EditContract() {
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
            Editar Contrato
          </Typography>
          <ContractsEditItems />
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default EditContract;
