import { useState} from 'react';
import { Box, Container } from '@mui/material';
import { PartesListResults } from '../components/partes-list/partes-list-results';
import { PartesListToolbar } from '../components/partes-list/partes-list-toolbar';
import { DashboardLayout } from '../layout/layout';

function PartesList() {
  const [reload, setReload] = useState(false)
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
          <PartesListToolbar  setReload={setReload} reload={reload}  />
          <Box sx={{ mt: 3 }}>
            <PartesListResults  setReload={setReload} reload={reload}  />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default PartesList;
