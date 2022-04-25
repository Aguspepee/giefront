import { Box, Container } from '@mui/material';
import { CertificacionesListResults } from '../components/certif-list/certif-list-results';
import { CertificacionesListToolbar } from '../components/certif-list/certif-list-toolbar';
import { DashboardLayout } from '../layout/layout';
import { certificaciones } from '../__mocks__/certificaciones';

function CertificacionessList() {
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
          <CertificacionesListToolbar />
          <Box sx={{ mt: 3 }}>
            <CertificacionesListResults certificaciones={certificaciones} />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default CertificacionessList;
