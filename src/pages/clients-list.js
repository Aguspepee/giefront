import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { ClientsListResults } from '../components/clients-list/clients-list-results';
import ClientsListToolbar from '../components/clients-list/clients-list-toolbar';
import { DashboardLayout } from '../layout/layout';

function ClientsList() {
  const [reload, setReload] = useState(false)
  return (
    <>
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 4
          }}
        >
          <Container maxWidth={false}>
            <ClientsListToolbar setReload={setReload} reload={reload} />
            <Box sx={{ mt: 3 }}>
              <ClientsListResults setReload={setReload} reload={reload} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default ClientsList;
