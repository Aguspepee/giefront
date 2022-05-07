import { Box, Container } from '@mui/material';
import { useState } from 'react';
import { ContractsListResults } from '../components/contracts-list/contracts-list-results';
import ContractsListToolbar from '../components/contracts-list/contracts-list-toolbar';
import { DashboardLayout } from '../layout/layout';
import { contracts } from '../__mocks__/contracts';

function ContractsList() {
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
            <ContractsListToolbar setReload={setReload} reload={reload} />
            <Box sx={{ mt: 3 }}>
              <ContractsListResults setReload={setReload} reload={reload} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    </>
  )
}

export default ContractsList;
