import { Box, Container } from '@mui/material';
import { ClientsListResults } from '../components/clients/clients-list-results';
import { ClientsListToolbar } from '../components/clients/clients-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { clients } from '../__mocks__/clients';

function Clients() {
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
          <ClientsListToolbar />
          <Box sx={{ mt: 3 }}>
            <ClientsListResults clients={clients} />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}



export default Clients;
