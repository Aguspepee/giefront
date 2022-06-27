import { Box, Container } from '@mui/material';
import { CertificadosListResults } from '../components/certificados-list/certificados-list-results';
import { DashboardLayout } from '../layout/layout';

function CertificadosList() {
  return (
    <>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 3
          }} 
        >
          <Container maxWidth={false}>
            <CertificadosListResults />
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}


export default CertificadosList;
