import { Box, Container } from '@mui/material';
import { RemitosListResults } from '../components/remitos-list/remitos-list-results';
import { RemitosListToolbar } from '../components/remitos-list/remitos-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { remitos } from '../__mocks__/remitos';

function RemitosList() {
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
          <RemitosListToolbar />
          <Box sx={{ mt: 3 }}>
            <RemitosListResults remitos={remitos} />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default RemitosList;
