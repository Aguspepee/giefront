import { Box, Container } from '@mui/material';
import { CertificacionesCreatePartes } from '../components/certif-create/certif-create-partes';
import { CertificacionesCreateFilters } from '../components/certif-create/certif-create-filters';
import { DashboardLayout } from '../layout/layout';

function CertificacionesCreate() {
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
          <CertificacionesCreateFilters />
          <Box sx={{ mt: 3 }}>
            <CertificacionesCreatePartes  />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default CertificacionesCreate;
