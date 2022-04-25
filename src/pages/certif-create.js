import { Box, Container } from '@mui/material';
import { CertificacionesCreatePartes } from '../components/certif-create/certif-create-partes';
import { CertificacionesCreateFilters } from '../components/certif-create/certif-create-filters';
import { DashboardLayout } from '../layout/layout';
import { partes } from '../__mocks__/partes';

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
            <CertificacionesCreatePartes partes={partes} />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default CertificacionesCreate;
