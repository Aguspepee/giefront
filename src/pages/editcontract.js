import { Box, Container, Grid, Typography } from '@mui/material';
import { EditContractItems } from '../components/editcontract/editcontract-items';
import { DashboardLayout } from '../components/dashboard-layout';


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
     
                  <EditContractItems />
              
        </Container>
      </Box>
    </DashboardLayout>
  )
}


export default EditContract;
