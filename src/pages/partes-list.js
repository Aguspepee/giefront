import { useState} from 'react';
import { Box, Container } from '@mui/material';
import { PartesListResults } from '../components/partes-list/partes-list-results';
import { PartesListToolbar } from '../components/partes-list/partes-list-toolbar';
import { DashboardLayout } from '../layout/layout';

function PartesList() {
  
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
          <PartesListToolbar   />
          <Box sx={{ mt: 3 }}>
            <PartesListResults  />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}


export default PartesList;
