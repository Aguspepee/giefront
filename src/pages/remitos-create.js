import { Box, Container } from '@mui/material';
import { RemitosCreatePartes } from '../components/remitos-create/remitos-create-partes';
import { RemitosCreateFilters } from '../components/remitos-create/remitos-create-filters';
import { DashboardLayout } from '../layout/layout';

function RemitosCreate() {
  return (
    <>
      <DashboardLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth={false}>
          <RemitosCreateFilters />
          <Box sx={{ mt: 3 }}>
            <RemitosCreatePartes  />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default RemitosCreate;
