import { Box, Container } from '@mui/material';
import { RemitosListResults } from '../components/remitos-list/remitos-list-results';
import { RemitosListToolbar } from '../components/remitos-list/remitos-list-toolbar';
import { DashboardLayout } from '../layout/layout';

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
            <RemitosListResults />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default RemitosList;
