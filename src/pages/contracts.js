import { Box, Container } from '@mui/material';
import { ContractsListResults } from '../components/contracts/contracts-list-results';
import { ContractsListToolbar } from '../components/contracts/contracts-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';
import { contracts } from '../__mocks__/contracts';

function Contracts() {
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
          <ContractsListToolbar />
          <Box sx={{ mt: 3 }}>
            <ContractsListResults contracts={contracts} />
          </Box>
        </Container>
      </Box>
      </DashboardLayout>
    </>
  )
}



export default Contracts;
